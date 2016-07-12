var express = require('express');
var app = express();

var secrets = require('./secrets.json');

var compression = require('compression');
var bodyParser = require ('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var path = require('path');
var server = require('http').createServer(app);
var stripe = require('stripe')(secrets.key);

// Config

app.use(compression());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname));

// Routes

app.post('/charge', function(req, res){

  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 500,
    currency: 'usd',
    card: stripeToken,
    description: 'How to web design donation'
  }, function(err, charge) {

    if(err && err.type === 'StripeCardError')
      res.send(500, 'Card declined');
    else
      res.send(200);

  });

});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server

var port = process.env.PORT || 9000;

server.listen(port, 'localhost', function(){
  console.log('Express server listening on port ' + port + ' in mode ' + process.env.NODE_ENV);
});

module.exports = app;