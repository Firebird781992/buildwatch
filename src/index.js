const https = require('https')
var Botkit = require('botkit')
var controller = Botkit.slackbot()
var bot
var userList
var channelList

function getUserListFromSlack (config) {
  https.get('https://slack.com/api/users.list?token=' + config.bot_token, (res) => {
    const statusCode = res.statusCode
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`)
    }
    if (error) {
      console.log(error.message)
      // consume response data to free up memory
      res.resume()
      return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData)
        console.log(parsedData)
        userList = parsedData
      } catch (e) {
        console.log(e.message)
      }
    })
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`)
  })
}

function getChannelListFromSlack (config) {
  https.get('https://slack.com/api/channels.list?token=' + config.bot_token, (res) => {
    const statusCode = res.statusCode
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`)
    }
    if (error) {
      console.log(error.message)
      // consume response data to free up memory
      res.resume()
      return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData)
        console.log(parsedData)
        channelList = parsedData
      } catch (e) {
        console.log(e.message)
      }
    })
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`)
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

  getUserListFromSlack(config)
  getChannelListFromSlack(config)

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

function processPayload (payload) {
  payload = payload.payload
  switch (true) {
    case JSON.stringify(payload.author_email).includes('drazisil') != 0:
      return bot.startPrivateConversation(
        {
          text: '^ @drazisil Yikes, a bot!',
          user: '' // drazisil
        }, function (err, convo) {
        convo.say('You were mentioned in <#' + message.channel + '>!')
      })
    default:
      return bot.startPrivateConversation(
        {
          text: '^ @drazisil Yikes, a bot!',
          user: '' // drazisil
        }, function (err, convo) {
        convo.say('You were mentioned in <#' + message.channel + '>!')
      })
  }
}

module.exports = {
  init: init,
  processPayload: processPayload
}
