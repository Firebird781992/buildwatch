var config = require('./config/buildwatch.json')
var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')

var buildwatch = require('./src/index.js')

var app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// Server port is set by PORT env or web_port from config file with fallback to 3000
app.set('port', process.env.PORT || config.web_port || 3000)

app.post('/hooks/circleci', function (req, res) {
  // console.dir(req.body)
  buildwatch.processPayload(req.body)
  res.send('Ok')
})

app.use(express.static('public'))

buildwatch.init(config)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
