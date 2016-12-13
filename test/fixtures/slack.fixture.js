var nock = require('nock')

var slackAPIUserListSuccess = nock('https://slack.com') // eslint-disable-line no-unused-vars
                .get('/api/users.list?token=xxx')
                .reply(200, {
                  'members': [{
                    'id': '123ABC',
                    'profile': {
                      'email': 'pedro.teixeira@gmail.com'
                    }
                  }]
                })

var slackAPIUserListFailure = nock('https://slack.com') // eslint-disable-line no-unused-vars
                .get('/api/users.list?token=yyy')
                .reply(200, {
                  'ok': false,
                  'error': 'I broke',
                  'members': [{
                    'id': '123ABC',
                    'profile': {
                      'email': 'pedro.teixeira@gmail.com'
                    }
                  }]
                })

var slackAPIChannelListSuccess = nock('https://slack.com') // eslint-disable-line no-unused-vars
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

var slackAPIChannelListFailure = nock('https://slack.com') // eslint-disable-line no-unused-vars
                .get('/api/channels.list?token=yyy')
                .reply(200, {
                  'ok': false,
                  'error': 'I broke',
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

