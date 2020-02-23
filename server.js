// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/welcome', function(req,res){
  res.send("Hello word");
});
// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  var date_string = req.params.date_string;
  var checkDate = Date.parse(date_string);
  
  if(isNaN(date_string) && !isNaN(checkDate)){     
    res.send({ unix: new Date(date_string).getTime(), utc: new Date(date_string).toUTCString()});
  } else if(date_string == null){
    var date_string = new Date();
    res.send({unix: new Date(date_string).getTime(), utc: new Date(date_string).toUTCString()});
  } else {
    res.send({error: "Invalid Date"});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});