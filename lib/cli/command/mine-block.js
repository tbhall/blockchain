const blockchain = require('../../blockchain');

module.exports = function (vorpal) {
  vorpal
    .command('mine <data>', 'Mine a new block. Eg: mine data')
    .alias('m')
    .action(function(args, callback) {
      if (args.data) {
        blockchain.mine(args.data);
      }
      callback();
    })
}
