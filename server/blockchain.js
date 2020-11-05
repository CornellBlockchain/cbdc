const Block = require("./block.js");
const mysql = require('mysql');

class Blockchain {
  constructor(chain) {
    this.chain = chain;
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  /**
   * Given a chain, return true if it is valid
   * @param {array} chain
   * @returns {boolean}
   */
  isValidChain(chain) {
    if (chain[0].hash !== "genesis hash")
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
