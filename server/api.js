const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const Wallet = require("./wallet");
const Transaction = require("./transaction");
const Blockchain = require("./blockchain");
const Block = require("./block");

//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//using the blody parser middleware
app.use(bodyParser.json());

// db connection
let conn = mysql.createConnection({
  host: "cbdc.cjymkpun4qnd.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "cornellblockchain",
  database: "blockchain",
});

let blockchain = null;

//EXPOSED APIs

app.use(cors());

app.get("/generateWallet", (req, res) => {
  const w = new Wallet();
  res.json(w.getKeyPairJSON());
});

app.get("/getWallet", (req, res) => {
  const w = new Wallet(req.query.privateKey);
  res.json(w.getKeyPairJSON());
});

app.get("/getBalance", (req, res) => {
  const w = new Wallet(req.query.privateKey);
  res.json(w.calculateBalance(blockchain));
});

app.get("/test", (req, res) => {
  console.log(blockchain.chain);
  if (blockchain.isValidChain(blockchain.chain)) {
    res.json("eys");
  } else {
    res.json("no");
  }
});

app.post("/transact", (req, res) => {
  // get post body data
  const data = req.body;

  if (
    !(
      data.hasOwnProperty("senderPrivateKey") &&
      data.hasOwnProperty("recipientPublicKey") &&
      data.hasOwnProperty("amount")
    )
  ) {
    res.json({
      status: 400,
      error:
        'Bad request. POST body does not match {"senderPrivateKey", "recipientPublicKey", "amount"}',
    });
    return;
  }

  // instantiate wallet object with private key
  const wallet = new Wallet(data.senderPrivateKey);
  // create transaction and get the transaction object
  const transaction = Transaction.newTransaction(
    wallet,
    data.recipientPublicKey,
    parseFloat(data.amount)
  );
  // use the transaction object to mine a block with the addBlock method under blockchain.js
  const newBlock = blockchain.addBlock(transaction);
  // validate chain
  if (blockchain.isValidChain(blockchain.chain)) {
    res.json({
      status: 200,
    });

    // update AWS database
    const { timestamp, lastHash, data, hash } = newBlock;
    conn.query(
      `INSERT INTO chain (timestamp, lasthash, data, hash) VALUES (${timestamp}, '${lastHash}', '${JSON.stringify(
        data
      )}', '${hash}')`,
      (err, result) => {
        if (err) console.error(err);
        console.log("yeet");
      }
    );
  } else {
    res.json({
      status: 500,
      error: "Internal Server Error. Chain is not valid",
      block: newBlock,
    });
  }
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);

  conn.connect((err) => {
    if (err) {
      res.json(err);
      return;
    }
  });
  conn.query("SELECT * FROM chain", (err, rows) => {
    if (err) throw err;
    let chain = [];
    let data = rows.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    if (data) {
      data.forEach((row) => {
        let block = new Block(
          row.timestamp,
          row.lasthash,
          JSON.parse(row.data),
          row.hash
        );
        chain.push(block);
      });
    } else {
      chain = [Block.genesis()];
    }
    blockchain = new Blockchain(chain);
  });
});
