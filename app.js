var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs =require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.render('index', {title: '等一个人咖啡'})
});

http
    .createServer(app)
    .listen(4096, function(){
        console.log('Express server listening on port 4096');
        });

// fs.readdirSync('./controllers').forEach(function (file) {
//     if(file.substr(-3) == '.js') {
//         route = require('./controllers/' + file);
//         route(app);
//     }
// });
