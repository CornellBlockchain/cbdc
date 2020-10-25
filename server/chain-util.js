var ec = require("elliptic").ec("secp256k1");

const uuidV1 = require("uuid/v1");

const SHA256 = require("crypto-js/sha256");

class ChainUtil {
  /**
   * generate a key pair object
   * @param
   * @returns {object} a key pair object
   * Please refer to https://github.com/indutny/elliptic for more docs
   */
  static genKeyPair() {
    return ec.genKeyPair();
  }

  /**
   * generate an unique string ID
   * @param
   * @returns {string} an unique string ID
   * Please refer to https://www.npmjs.com/package/uuid for more docs
   */
  static generateID() {
    return uuidV1();
  }

  /**
   * hash the data with SHA256
   * @param {any} data data to be hashed
   * @returns {string} hash value in string
   */
  static hash(data) {
    let h = SHA256(JSON.stringify(data)).toString();
    return h;
  }

  /**
   * Get the public key in string form
   * @param {object} keyPair the key pair object from genKeyPair()
   * @returns {string} public key in hex string form
   */
  static getPublicKey(keyPair) {
    return keyPair.getPublic().encode("hex");
  }

  /**
   * Get the private key in string form
   * @param {object} keyPair the key pair object from genKeyPair()
   * @returns {string} private key in hex string form
   */
  static getPrivateKey(keyPair) {
    return keyPair.getPrivate("hex");
  }

  /**
   * Get key pair object from private key
   * @param {string} privateKey
   * @returns {object} key pair
   */
  static keyPairFromPrivate(privateKey) {
    return ec.keyFromPrivate(privateKey);
  }

  /**
   * Sign the data hash with the key pair
   * @param {object} keyPair the key pair object from genKeyPair()
   * @param {string} dataHash hash
   * @returns {object} an int array
   */
  static sign(keyPair, dataHash) {
    return keyPair.sign(dataHash).toDER();
  }

  /**
   * Verify the transaction signature to check its validity
   * using the method provided in EC module
   * @param {string} publicKey
   * @param {string} dataHash hex-string
   * @param {object} signature int array
   * @returns {boolean}
   */
  static verifySignature(publicKey, dataHash, signature) {
    return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
  }

  static id(){
    return uuidV1();
  }
}

module.exports = ChainUtil;
