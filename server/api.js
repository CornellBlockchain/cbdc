const express = require("express");
const bodyParser = require("body-parser");
const Wallet = require("./wallet");

//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//using the blody parser middleware
app.use(bodyParser.json());

//EXPOSED APIs

app.get("/generateWallet", (req, res) => {
  const w = new Wallet();
  res.json(w.getKeyPairJSON());
});

app.get("/getWallet", (req, res) => {
  const w = new Wallet(
    "6156fecec41ea1efe37c6fdef285dd9208f864c64453235ee234a1502743cdbf"
  );
  res.json(w.getKeyPairJSON());
});

app.post("/mine", (req, res) => {
  res.json("sdfsdf");
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
