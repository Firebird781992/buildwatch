var assert = require('assert')
var slack = require('../src/slack.js')
require('../test/fixtures/slack.fixture.js')
var config = {}

describe('Slack interactions', function () {
  describe('Get userList from Slack', function () {
    it('should succeed in fetching one result', function (done) {
      config.bot_token = 'xxx'
      slack.getUserListFromSlack(config, function (err, res) {
        if (err) {
          throw err
        } else {
          assert.equal(1, res.length)
        }
        done()
      })
    })

    it('should return an error', function (done) {
      config.bot_token = 'yyy'
      slack.getUserListFromSlack(config, function (err, res) {
        if (err) {
          assert.equal('I broke', err)
        } else {
          throw new Error('Returned ' + res)
        }
        done()
      })
    })
  })

  describe('Get channelList from Slack', function () {
    it('should succeed in fetching two results', function (done) {
      config.bot_token = 'xxx'
      slack.getChannelListFromSlack(config, function (err, res) {
        if (err) {
          throw err
        } else {
          assert.equal(2, res.length)
        }
        done()
      })
    })

    it('should return an error', function (done) {
      config.bot_token = 'yyy'
      slack.getChannelListFromSlack(config, function (err, res) {
        if (err) {
          assert.equal('I broke', err)
        } else {
          throw new Error('Returned ' + res)
        }
        done()
      })
    })
  })
})
