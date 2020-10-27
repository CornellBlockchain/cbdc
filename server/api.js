const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require("body-parser");
const Wallet = require("./wallet");
const Block = require("./block");
const Blockchain = require("./blockchain");


//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//using the blody parser middleware
app.use(bodyParser.json());

// db connection
let conn = mysql.createConnection({
  host: 'cbdc.cjymkpun4qnd.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'cornellblockchain',
  database: 'blockchain'
});

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
  conn.connect((err) => {
    if (err) {
      res.json(err);
      return;
    }
  });
  conn.query('SELECT * FROM chain', (err, rows) => {
    if (err) throw err;
    let chain = [];
    let data = rows.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    if (data) {
      data.forEach((row) => {
        let block = new Block(row.timestamp, row.lasthash, JSON.parse(row.data), row.hash);
        chain.push(block);
      })
    } else {
      chain = [Block.genesis()];
    }
    let blockchain = new Blockchain(chain);
    res.json(w.calculateBalance(blockchain));
  });
  
});

app.post("/transact", (req, res) => {
  // get post body data
  // const data = req.body;

  // instantiate wallet object with private key
  // const w = new Wallet(data.privateKey);

  // create transaction and get the transaction object

  // use the transaction object to mine a block with the addBlock method under blockchain.js

  // validate chain and update the AWS database

  // give back some sort of response
  res.json("sdfsdf");
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
