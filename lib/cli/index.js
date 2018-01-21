const vorpal = require('vorpal')();

module.exports = function (vorpal) {
  vorpal
    .use(require('./command/mine-block.js'))
    .use(require('./command/list-blockchain.js'))
    .use(require('./command/genesis.js'))
    .delimiter('blockchain →')
    .show()
}
