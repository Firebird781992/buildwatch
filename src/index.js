const db = require('./db.js') // eslint-disable-line no-unused-vars
const slack = require('./slack.js')

function init (config) {
  slack.init(config)
}

module.exports = {
  init: init
}
