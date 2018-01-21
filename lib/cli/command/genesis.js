const blockchain = require('../../blockchain');
const logger = require('../util/logger.js');

module.exports = function (vorpal) {
  vorpal
    .command('genesis <data...>', 'This creates a Genesis Block. Eg: genesis Initial')
    .alias('g')
    .action(function(args, callback) {
      blockchain.generateGenesis(args.data.join(' '));

      callback();
    })
}
