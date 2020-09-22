const SHA256 = require("crypto-js/SHA256");

class Block {
  constructor(timestamp, data, lastHash, hash) {
    this.timestamp = timestamp;
    this.data = data;
    this.lastHash = lastHash;
    this.hash = hash;
  }

  static genesis() {
    return new this('Genesis time', {}, "genesis last hash", "genesis hash");
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(
      `${timestamp}${lastHash}${data}`
    ).toString();
  }

  static mineBlock(lastBlock, data) {
    let hash;
    let lastHash = lastBlock.hash;
    let timestamp = Date.now();

    hash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, data, lastHash, hash);
  }

  static blockHash(block) {
    const { timestamp, data, lastHash } = block;

    return Block.hash(timestamp, lastHash, data);
  }
}

module.exports = Block;
