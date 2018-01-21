const Table = require('cli-table2')
const logger = require('./logger.js');
const colors = require('colors/safe');

function logBlockchain(blockchain) {
  blockchain.forEach((block, index) => {
    const table = new Table({
      style:{border:[],header:[]},
      wordWrap: true,
      colWidths:[20,25]
    });
    const object = JSON.parse(JSON.stringify(block))
    for(let key in object) {
      if (key === 'index') {
        const blockNumber = object[key]
        if (blockNumber === 0) {
          table.push([{colSpan:2,content:colors.green.bold("Genesis Block"), hAlign:'center'}])
        } else {
          table.push([{colSpan:2,content:colors.green.bold(`Block #${object[key]}`), hAlign:'center'}])
        }
      } else {
        const obj = {};
        if (key === 'previousHash') {
          obj[`${colors.gray('Previous Hash')}`] = object[key]
        } else if (key === 'timestamp') {
          obj[`${colors.gray('Timestamp')}`] = new Date(object[key] * 1000).toUTCString()
        } else if (key === 'data') {
           obj[`${colors.gray('Data')}`] = object[key]
        } else if (key === 'hash') {
          obj[`${colors.gray('Hash')}`] = object[key]
        } else if (key === 'nonce') {
          obj[`${colors.gray('Nonce')}`] = object[key]
        }
        table.push(obj)
      }
    }
    logger.log(table.toString())
  })
}

module.exports = logBlockchain;
