var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);

app.use(bodyParser.urlencoded({    
  extended: true
}));
app.post('/api/user', function (req, res) {
    console.log(req.body);
    res.send(req.body);
  
  });
var PORT = process.env.PORT || 3000;
server.listen(PORT);
