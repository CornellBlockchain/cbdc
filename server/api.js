const express = require("express");
const bodyParser = require("body-parser");
const Wallet = require("./wallet");
const Transaction = require("./transaction")
const Blockchain = require("./blockchain");
const Block = require("./block");

//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//using the blody parser middleware
app.use(bodyParser.json());

//EXPOSED APIs

app.get("/getNewWallet", (req, res) => {
  const w = new Wallet();
  const w2 = new Wallet(
    "6156fecec41ea1efe37c6fdef285dd9208f864c64453235ee234a1502743cdbf"
  );
  res.json({ one: w.getKeyPairJSON(), two: w2.getKeyPairJSON() });
});

app.post("/mine", (req, res) => {
  res.json("sdfsdf");
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});

app.post("/transact", (req, res) =>{
  try{
    const wallet=new Wallet(req.body.senderPrivateKey);
    const trans=new Transaction();
    trans.newTransaction(wallet, req.body.recipientPublicKey, req.body.amount);
    const bc=Blockchain(Block.genesis());
    bc.addBlock(trans);
    
    res.json({
      "status": 200,
   });
  }
  catch(err) {
    res.json({
        "status": 400,
        "error": err.message,
     });
  }
});
