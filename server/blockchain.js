const Block = require("./block.js");
const con = mysql.createConnection({
  host: 'cbdc.cjymkpun4qnd.us-east-1.rds.amazonaws.com',
  user: 'admin',
  port: 3306,
  password: 'cornellblockchain',
  database: 'blockchain'
});

class Blockchain {
  constructor() {
    con.connect((err) => {
       if(err){ console.log('Cannot connect to database');}
   });
    con.query('SELECT * FROM chain', (err,rows) => {
      if(err) throw err;
      rows.forEach( (row) => {
        if(row){
          let block= new Block(row.timestamp, row.lastHash, row.data, row.hash);
          this.chain.push(block);
        }
        else{this.chain = [Block.genesis()];}

        });
      });
    }


  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false;
    }

    return true;
  }
}

module.exports = Blockchain;
