var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;

require('./routes/api.js')(app);

app.listen(port);
console.log('server start' + port);
