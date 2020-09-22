const Block = require('./block.js');

class Blockchain{

  constructor(){
    this.chain = [Block.genesis()];
  }

  addBlock(data){
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain){
      if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
          return false;

      for(let i = 1 ; i<chain.length; i++){
          const block = chain[i];
          const lastBlock = chain[i-1];
          if((block.lastHash !== lastBlock.hash) || (
              block.hash !== Block.blockHash(block)))
          return false;
      }

      return true;

  }

  // replaceChain(newChain){
  //   if (newChain.length <= this.chain.length){
  //     console.log('ya no');
  //     return;
  //   } else if (!this.isValidChain(newChain)){
  //     console.log('invalid chain');
  //     return;
  //   }
  //   this.chain = newChain;
  //   console.log("Replacing the current chain with new chain");
  // }

}

module.exports = Blockchain