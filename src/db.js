var sqlite3 = require('sqlite3').verbose()
var dbUsers = new sqlite3.Database('../db/users.db')
var dbChannels = new sqlite3.Database('../db/channels.db')
