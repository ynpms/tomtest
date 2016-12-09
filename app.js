/******NO NEED TO MODIFY ****/
var express = require('express'); // Adding the express library 
var mustacheExpress = require('mustache-express'); // Adding mustache templating system and connecting it to 
var request = require('request');  // Adding the request library (to make HTTP reqeusts from the server)
var tools = require('./tools.js'); // Custom module providing additional functionality to the server

var app = express(); // initializing application
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


// For each request to this server, run the function "logger" in tools.js 
app.use(tools.logger);

// Set up /static path to host css/js/image files directly
app.use('/static', express.static(__dirname + '/static'));
app.use('/blog/static', express.static(__dirname + '/static'));


/****END OF NO NEED TO MODIFY SECTION ******/

// Define your routes here

app.get(['/', '/homepage'], function (req, res, next) {
  res.render('homepage.html');
});


app.get(['/blog/8-experiments-in-motivation', '/blog1'], function (req, res, next) {
  request({
        url: 'http://localhost:3001/blog?slug=8-experiments-in-motivation',
        method: 'GET',
        headers: {
          'Content-Type':  "application/json"
        }
      }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
            var json = JSON.parse(body);
            res.render('blog-template.html', {'title': json.title, 'content': json.content});
        }
    });
});


// Start up server on port 3000 on host localhost
var server = app.listen(process.env.PORT||3000, function () {
var port = server.address().port;

  console.log('Assignment 3 server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});


//POST request for sending email using Mailgun API
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/email', function (req, res) {
  console.log("Sending email to myself");
  var name = req.body.contactName;
  var subj = req.body.contactSubject;
  var msg = req.body.contactMessage;
  var address = req.body.contactAddress;

  // The server sends an HTTP request to the Mailgun servers via their
  // API to send an email
  request({
      url: 'https://api.mailgun.net/v3/kayashaolu.me/messages',
      method: 'POST',
      headers: {
        'Content-Type':  "application/x-www-form-urlencoded"
      },
      form: {
        from: name + ' ' + '<riyana.b@berkeley.edu>',
        to: 'Riyana Basu <riyana.b@berkeley.edu>',
        subject: subj,
        text: "Email Address: " + address + " Message: " + msg 
      },
      auth: {
        user: 'api',
        password: 'key-a47b29224335121b5591e4beb9bce80c'
      }

    }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log(response.statusCode, body);
      }
  });

  notifications = "Hi " + name + ", your message was sent.";
  res.render('contactUs.html', {'notifications': notifications});

});


//allows admin to upload a blog post from add post form
app.post('/admin', function (req, res) {
  console.log("Adding your rating.");
  var rating = req.body.rating;
  var newrating = {
        "name": name,
        "review": rating
      };

  request({
      url: 'http://localhost:3001/rate',
      method: 'POST',
      json: true,
      body: newrating
    }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log(response.statusCode, body);
      }
  });
});



