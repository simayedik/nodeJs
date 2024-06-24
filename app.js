var express = require('express');
var app = express();
var router  = require('./router');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',router);


app.listen('3000');
