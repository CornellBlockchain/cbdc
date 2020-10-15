const Block = require("./block.js");
const mysql = require('mysql');

class Blockchain {
  constructor() {
    this.chain = [];

    const conn = mysql.createConnection({
        host: 'cbdc.cjymkpun4qnd.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'cornellblockchain',
        database: 'blockchain'
    });

    conn.connect((err) => {
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });

    conn.query('SELECT * FROM chain', (err, rows) => {
        if(err) throw err;
        let data = rows.sort((a, b) => {
            return a.timestamp - b.timestamp;
        });
        if(data) {
            data.forEach( (row) => {
                let block = new Block(row.timestamp, row.lasthash, row.data, row.hash);
                this.chain.push(block);
            })
        } else {
            this.chain = [Block.genesis()];
        }
    });
  }

  getChain() {
      console.log(this.chain);
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
