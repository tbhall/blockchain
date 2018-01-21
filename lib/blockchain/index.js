const Block = require('./block')
const CryptoJS = require('crypto-js')
const logger = require('../cli/util/logger.js');
const logBlockchain = require('../cli/util/table.js');
const logShowAll = require('../cli/util/table-show-all.js');

class Blockchain {
  constructor () {
    this.blockchain = [Block.genesis]
    this.difficulty = 4
  }

  get () {
    return this.blockchain
  }

  get latestBlock () {
    return this.blockchain[this.blockchain.length - 1]
  }

  mine (data, showAll) {
    const newBlock = this.generateNextBlock(data,showAll)
    if(this.addBlock(newBlock)) {
      logger.log("New block was mined.");
    }
  }

  addBlock (newBlock) {
    if (this.isValidNewBlock(newBlock, this.latestBlock)) {
      this.blockchain.push(newBlock);
      return true;
    }
    return false;
  }

  calculateHashForBlock (block) {
    return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.nonce)
  }

  calculateHash (index, previousHash, timestamp, data, nonce) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data + nonce).toString()
  }

  isValidNewBlock (newBlock, previousBlock) {
    const blockHash = this.calculateHashForBlock(newBlock);

    if (previousBlock.index + 1 !== newBlock.index) {
      logger.log('New block has invalid index')
      return false
    } else if (previousBlock.hash !== newBlock.previousHash) {
      logger.log('New block has invalid previous hash')
      return false
    } else if (blockHash !== newBlock.hash) {
      logger.log(`Invalid hash: ${blockHash} ${newBlock.hash}`)
      return false
    } else if (!this.isValidHashDifficulty(this.calculateHashForBlock(newBlock))) {
      logger.log(`Invalid hash does not meet difficulty requirements: ${this.calculateHashForBlock(newBlock)}`);
      return false;
    }
    return true
  }

  generateNextBlock (blockData, showAll) {
    const previousBlock = this.latestBlock;
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000
    let nonce = 0;
    let nextHash = '';
    while(!this.isValidHashDifficulty(nextHash)) {
      nonce = nonce + 1;
      nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce);
    }
    const nextBlock = new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash, nonce);
    if(showAll === true) {
      logShowAll([nextBlock]);
    } else {
      logBlockchain([nextBlock]);
    }

    return nextBlock;
  }

  generateGenesis (blockData) {
    const nextTimestamp = new Date().getTime() / 1000
    let nonce = 0;
    let hash = '';
    while(!this.isValidHashDifficulty(hash)) {
      nonce = nonce + 1;
      hash = this.calculateHash(0, 0, nextTimestamp, blockData, nonce);
    }
    const nextBlock = new Block(0, 0, nextTimestamp, blockData, hash, nonce);
    logShowAll([nextBlock]);
    return nextBlock;
  }

  isValidHashDifficulty(hash) {
    for (var i = 0, b = hash.length; i < b; i ++) {
      if (hash[i] !== '0') {
        break;
      }
    }
    return i === this.difficulty;
  }
}

module.exports = new Blockchain()
