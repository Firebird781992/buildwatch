var chromedriver = require('chromedriver')
var geckodriver = require('geckodriver')

var args = [
    // optional arguments
]

function testGoogle (browser) {
  chromedriver.start(args)
  geckodriver.start(args)
  browser
    .url('http://www.google.com')
    .waitForElementVisible('body', 2000)
    .setValue('input[type=text]', 'nightwatch')
    .waitForElementVisible('button[name=btnG]', 1000)
    .click('button[name=btnG]')
    .pause(2000)
    .assert.containsText('#main', 'Night Watch')
    .end()
  chromedriver.stop()
  geckodriver.stop()
}

module.exports = {
  'Demo test Google': testGoogle
}
