const Blockchain = require("./blockchain");
const Block = require("./block");
const mysql = require('mysql');

describe("Blockchain", () => {
  let blockchain, blockchain2, chain;

  let conn = mysql.createConnection({
    host: 'cbdc.cjymkpun4qnd.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'cornellblockchain',
    database: 'blockchain'
  });

  beforeAll(done => {
    chain = [];
    conn.connect((err) => {
      if (err) {
        return;
      }
    });

    conn.query('SELECT * FROM chain', (err, rows) => {
      if (err) throw err;
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
      blockchain = new Blockchain(chain);
      blockchain2 = new Blockchain(chain);
      done();
    });
  });

  afterAll(() => {
    conn.end();
  });

  it("starts with the genesis block", () => {
    expect(blockchain.chain[0].hash).toEqual("genesis hash");
  });

  it("adds a new block", () => {
    const data = "foo";
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });

  it("validates a valid chain", () => {
    expect(blockchain.isValidChain(blockchain.chain)).toBe(true);
  });

  // it("invalidates a chain with a corrupt the genesis block", () => {
  //   blockchain2.chain[0].data = "bad data";

  //   expect(blockchain2.isValidChain(blockchain2.chain)).toBe(false);
  // });

  // it("invalidates a corrput chain", () => {
  //   blockchain2.addBlock("foo");
  //   blockchain2.chain[1].data = "not foo";

  //   expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  // });

  // it('replaces the chain with a valid chain',()=>{
  //     blockchain2.addBlock('goo');
  //     blockchain.replaceChain(blockchain2.chain);
  //     expect(blockchain.chain).toEqual(blockchain2.chain);
  // });

  // it('does not replaces the chain with a one with less than or equal to chain',()=>{
  //     blockchain.addBlock('foo');
  //     blockchain.replaceChain(blockchain2.chain);
  //     expect(blockchain.chain).not.toEqual(blockchain2.chain);
  // });
});