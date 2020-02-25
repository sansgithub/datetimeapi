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

// app.get("/api/timestamp/", (req, res) => {
//   res.json({ unix: Date.now(), utc: Date() });
// });

app.get("/api/timestamp/:date_string?", (req, res) => {
  
  let date_string = req.params.date_string;
  
  let dateObject = new Date(date_string);
  
  if (date_string==null) {
      dateObject = new Date();
      res.send({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
  }
  
  if (!isNaN(date_string)) {
    let dateInt = parseInt(date_string);
    dateObject = new Date(dateInt);
    res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
    console.log("1");
  } 
  
  else if(dateObject.toString() === "Invalid Date"){
      res.json({ error: dateObject.toString() });
  } else {
    console.log("2");
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});