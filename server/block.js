const SHA256 = require("crypto-js/SHA256");

class Block {
  constructor(timestamp, lastHash, data, hash) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash;
  }

  static genesis() {
    return new this(0, "genesis last hash", "{}", "genesis hash");
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static mineBlock(lastBlock, data) {
    let hash;
    let lastHash = lastBlock.hash;
    let timestamp = Date.now();

    hash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, data, hash);
  }

  static blockHash(block) {
    const { timestamp, lastHash, data } = block;

    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block;
