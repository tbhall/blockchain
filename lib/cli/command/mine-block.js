const blockchain = require('../../blockchain');
const logger = require('../util/logger.js');
module.exports = function (vorpal) {
  vorpal
    .command('mine <data...>', 'Mine a new block. Eg: mine data')
    .alias('m')
    .option('-a, --all', 'Show all values fully')
    .action(function(args, callback) {
      if (args.data) {
        if (args.options.all) {
          blockchain.mine(args.data.join(' '), true);
        } else {
          blockchain.mine(args.data.join(' '), false);
        }
      }
      callback();
    })
}
