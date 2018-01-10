const Block = require('./block')
const CryptoJS = require('crypto-js')
const logger = require('../cli/util/logger.js');

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

  mine (seed) {
    logger.log("A new Block was mined.");
  }
}

module.exports = new Blockchain()
