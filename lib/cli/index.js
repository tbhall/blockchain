const vorpal = require('vorpal')();

module.exports = function (vorpal) {
  vorpal
    .use(require('./command/mine-block.js'))
    .delimiter('blockchain →')
    .show()
}
