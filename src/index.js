const slack = require('./slack.js')

function init (config) {
  slack.init(config)
}

module.exports = {
  init: init
}
