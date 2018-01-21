const blockchain = require('../../blockchain');
const logBlockchain = require('../util/table.js');
const logShowAll = require('../util/table-show-all.js');

module.exports = function (vorpal) {
  vorpal
    .command('list', 'See the current state of the blockchain.')
    .alias('l')
    .option('-a, --all', 'Show all values fully')
    .action(function(args, callback) {
      if(args.options.all === true) {
        logShowAll(blockchain.blockchain);
      } else {
        logBlockchain(blockchain.blockchain);
      }
      callback();
    })
}
