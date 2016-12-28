const slack = require('./slack.js')

function init (config) {
  if (config.bot_token) {
    slack.init(config)
  }
}

module.exports = {
  init: init
}
