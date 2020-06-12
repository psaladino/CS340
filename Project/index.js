
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var path = require('path');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout:'main'});

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'handlebars');
app.set('port', 9810);
app.set('mysql', mysql);



app.get('/', function(req, res) {
    res.render('home');
});


app.use('/employees', require('./employees.js'));

app.use('/tools', require('./tools.js'));

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/certs', function(req, res) {
    res.render('certs');
});


app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
