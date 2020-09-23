var ec = require("elliptic").ec("secp256k1");

const Chain = require("./chain-util");

/**
 * describe is jest specific function
 * @prarams
 * name of the object as string for which the test is written
 * function that will define a series of tests
 */
describe("Chain Utils", () => {
  let keyPair, publicKey, data;
  /**
   * beforeEach allows us to run some code before
   * running any test
   * example creating an instance
   */
  beforeEach(() => {
    publicKey =
      "042be4e9e5abc144890d6b5cf747fa719cc4fa3faebb18a65efaf198d4a6feb9cb6a69c72037d97e21e79d7a8ded323b03115a8ebd43e4f4be30ecf79c5e6579ae";
    keyPair = ec.keyFromPublic(publicKey, "hex");

    data = { id: Chain.generateID(), balance: "1000", netid: "xll2" };
  });
  /**
   * it function is used to write unit tests
   * first param is a description
   * second param is callback arrow function
   */
  it("test get public key", () => {
    /**
     * expect is similar to assert
     * it expects something
     */
    expect(Chain.getPublicKey(keyPair)).toEqual(publicKey);
  });

  it("test public key type", () => {
    expect(typeof Chain.getPublicKey(keyPair)).toEqual("string");
  });

  it("test public key type", () => {
    expect(typeof Chain.getPublicKey(keyPair)).toEqual("string");
  });

  it("test SHA256 hash", () => {
    var hash = Chain.hash(data);
    var flag = true;
    if (hash.length != 64) flag = false;
    if (hash.match(/[^0-9]&[^a-f]/)) flag = false;
    expect(flag).toEqual(true);
  });

  it("test sign", () => {
    keyPair = Chain.genKeyPair();
    expect(typeof Chain.sign(keyPair, Chain.hash(data))).toEqual("object");
  });

  it("test sign type", () => {
    keyPair = Chain.genKeyPair();
    expect(Array.isArray(Chain.sign(keyPair, Chain.hash(data)))).toEqual(true);
  });
});
