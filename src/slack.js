var request = require('request')
var Botkit = require('botkit')
var controller = Botkit.slackbot()

var db = require('./db.js')

var bot
var userList
var channelList

/*
https://api.slack.com/methods/users.list
 */
function getUserListFromSlack (config, callback) {
  request('https://slack.com/api/users.list?token=' + config.bot_token, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var users = []
      body = JSON.parse(body)
      if (body.ok === false) {
        callback(body.error)
      } else {
        body.members.forEach(function (element) {
          if (element.profile.email) {
            users.push({'id': element.id, 'email': element.profile.email})
          }
        })
        callback(null, users)
      }
    }
  })
}

/*
https://api.slack.com/methods/channels.list
 */
function getChannelListFromSlack (config, callback) {
  request('https://slack.com/api/channels.list?token=' + config.bot_token, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var channels = []
      body = JSON.parse(body)
      if (body.ok === false) {
        callback(body.error)
      } else {
        body.channels.forEach(function (element) {
          if (element.is_channel && element.is_member) {
            channels.push({'id': element.id, 'name': element.name})
          }
        })
        callback(null, channels)
      }
    }
  })
}

function init (config) {
  bot = controller.spawn({
    token: config.bot_token
  })

  bot.startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error('Could not connect to Slack')
    }
  })

  getUserListFromSlack(config, function (err, res) {
    if (err) {
      throw err
    }
    userList = res
    console.dir(userList)
  })

  getChannelListFromSlack(config, function (err, res) {
    if (err) {
      throw err
    }
    channelList = res
    console.dir(channelList)
  })

  db.dbUsers.close()
  db.dbChannels.close()

  controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function (bot, message) {
    console.dir(message)

    bot.startConversation(message, function (err, convo) {
      if (err) {
        throw err
      }
      convo.ask('Are you sure you want me to shutdown?', [
        {
          pattern: bot.utterances.yes,
          callback: function (response, convo) {
            convo.say('Bye!')
            convo.next()
            setTimeout(function () {
              process.exit()
            }, 3000)
          }
        },
        {
          pattern: bot.utterances.no,
          default: true,
          callback: function (response, convo) {
            convo.say('*Phew!*')
            convo.next()
          }
        }
      ])
    })
  })
}

function sendDM (committerEmail, callback) {
  var message = committerEmail
  switch (true) {
    case JSON.stringify(committerEmail).includes('drazisil') !== 0:
      return bot.startPrivateConversation(
        {
          text: '^ @drazisil Yikes, a bot!',
          user: '' // drazisil
        }, function (err, convo) {
        if (err) {
          throw err
        }
        convo.say('You were mentioned in <#' + message.channel + '>!')
      })
    default:
      return bot.startPrivateConversation(
        {
          text: '^ @drazisil Yikes, a bot!',
          user: '' // drazisil
        }, function (err, convo) {
        if (err) {
          throw err
        }
        convo.say('You were mentioned in <#' + message.channel + '>!')
      })
  }
}

module.exports = {
  init: init,
  getUserListFromSlack: getUserListFromSlack,
  getChannelListFromSlack: getChannelListFromSlack,
  sendDM: sendDM
}
