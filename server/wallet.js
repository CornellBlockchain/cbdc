const ChainUtil = require("./chain-util");

class Wallet {
  #publicKey = ""; // the # means that it's a private field
  #privateKey = "";
  #keyPair = null;

  /**
   * Create a new wallet object
   * `const w = new Wallet();` would generate a random key pair
   * `const w2 = new Wallet("....")` would import a key pair with private key
   * @param {string} privateKey
   */
  constructor(privateKey = null) {
    // if privateKey is null, eg if the paramenter is empty
    if (privateKey) {
      this.#privateKey = privateKey;
      const key = ChainUtil.keyPairFromPrivate(privateKey);
      this.#publicKey = ChainUtil.getPublicKey(key);
      this.#keyPair = key;
    } else {
      this.#keyPair = ChainUtil.genKeyPair();
      this.#publicKey = ChainUtil.getPublicKey(this.#keyPair);
      this.#privateKey = ChainUtil.getPrivateKey(this.#keyPair);
    }
  }

  getKeyPairJSON() {
    return { publicKey: this.#publicKey, privateKey: this.#privateKey };
  }

  // createTransaction() {}

  // calculateBalance() {}
}

module.exports = Wallet;
