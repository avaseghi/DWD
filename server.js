var https = require('https');
var fs = require('fs'); // Using the filesystem module
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var config = require('./config.js');
var db = mongojs(config.mlabstring, ["thesubmissions"]);
var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

// Start Normal Express Code

var app = express();
var httpsServer = https.createServer(credentials, app);
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: '1000mb' }); // for parsing form data

app.use(express.static('public'));
app.use(urlencodedParser);

httpsServer.listen(8000, function () {

  console.log('App listening on port 8000!')
})

app.post('/saveframe', function(req, res) {

  res.send('{response: "Thanks"}');
  console.log(req.body);
  db.thesubmissions.save({"submission":req.body.image}, function(err, saved) {
    if( err || !saved ) console.log("Not saved");
      else console.log("Saved");
  });
});

app.get('/send', function(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  //db.collection.find().sort({_id:-1}).limit(1)
  db.thesubmissions.findOne({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    }
    else {
      console.log(saved);
      res.send(saved);
  	}
  });
});
