var config = require('./config.json')
var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')

var buildBot = require('./src/index.js')

var app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.set('port', process.env.PORT || 3000)

app.post('/hooks/circleci', function (req, res) {
  // console.dir(req.body)
  buildBot.processPayload(req.body)
  res.send('Ok')
})

buildBot.init(config)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
