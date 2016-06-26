var SC = require('node-soundcloud');
var express = require('express');
var morgan = require('morgan')

SC.init({
  id: '<ID>',
  secret: '<SECRET>',
  uri: 'http://127.0.0.1:3000/callback'
});

var app = express();
app.use(morgan('combined'));

app.get('/', function(req, res) {
  var url = SC.getConnectUrl();
  console.log(url);
  res.writeHead(301, {Location: url});
  res.end();
});

app.get('/callback', function(req, res) {
  var code = req.query.code;
  SC.authorize(code, function (err, accessToken) {
    if (err) throw err;
    res.writeHead(301, {Location: 'http://localhost:48770/defeerer?access_token=' + accessToken});
    res.end();
  })
})

app.listen(3000);
