const { SHA256 } = require('crypto-js');

module.exports = class Block {
  constructor (
    index = 0,
    previousHash = '0',
    timestamp = new Date().getTime() / 1000,
    data = 'none',
    hash = '',
    nonce = 0
  ) {
    this.index = index
    this.previousHash = previousHash.toString()
    this.timestamp = timestamp
    this.data = data
    this.hash = hash.toString()
    this.nonce = nonce
  }

  static get genesis () {
    return new Block(
      0,
      '0',
      1515536743,
      'Blockchain CLI',
      '00004db72b899bb695e9996e3e3014305b86d799b8bf2750390e565cdf406cad',
      16515
    )
  }
}
