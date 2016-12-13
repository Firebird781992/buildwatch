var assert = require('assert')
var nock = require('nock')
var slack = require('../src/slack.js')

var config = {
  bot_token: 'xxx'
}

var slackAPIUserList = nock('https://slack.com') // eslint-disable-line no-unused-vars
                .get('/api/users.list?token=xxx')
                .reply(200, {
                  'members': [{
                    'id': '123ABC',
                    'profile': {
                      'email': 'pedro.teixeira@gmail.com'
                    }
                  }]
                })

var slackAPIChannelList = nock('https://slack.com') // eslint-disable-line no-unused-vars
                .get('/api/channels.list?token=xxx')
                .reply(200, {
                  'channels': [
                    {
                      'id': 'xxx',
                      'name': 'channel 1',
                      'is_channel': true,
                      'is_member': true
                    },
                    {
                      'id': 'yyy',
                      'name': 'channel 2',
                      'is_channel': true,
                      'is_member': true
                    }
                  ]
                })

describe('Slack interactions', function () {
  describe('userList', function () {
    it('should return 1 result', function (done) {
      slack.getUserListFromSlack(config, function (err, res) {
        if (err) {
          throw err
        }
        assert.equal(1, res.length)
        done()
      })
    })
  })

  describe('channelList', function () {
    it('should return 2 result', function (done) {
      slack.getChannelListFromSlack(config, function (err, res) {
        if (err) {
          throw err
        }
        assert.equal(2, res.length)
        done()
      })
    })
  })
})
