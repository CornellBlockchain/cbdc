const SHA256 = require("crypto-js/sha256");

let data = {'balance': 100, 'netid': 'xll2'}
let nonce = 2
let diff = 5

let hash = SHA256(data + nonce)
// 00000alksjf3f0w9afjaw09fjw309fjwq9s3fjqw09jfq09wj09j3w9q0fj09wjf

// 
// aslkdfjalksjfklawejfaklewjflkasjdfklajsdfkljaselkfjalkdsjfkldsjf
