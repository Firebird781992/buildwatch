var config = require('./config/buildwatch.json')
var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')

var buildBot = require('./src/index.js')

var app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.set('port', 3000)

app.get('/', function (req, res) {
  res.send('Ok')
})

app.post('/hooks/circleci', function (req, res) {
  // console.dir(req.body)
  buildBot.processPayload(req.body)
  res.send('Ok')
})

buildBot.init(config)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
