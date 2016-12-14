var sqlite3 = require('sqlite3').verbose()
var dbUsers
var dbChannels

function init () {
  dbUsers = new sqlite3.Database('./db/users.db')
  dbChannels = new sqlite3.Database('./db/channels.db')
}

module.exports = {
  dbUsers: dbUsers,
  dbChannels: dbChannels,
  init: init
}
