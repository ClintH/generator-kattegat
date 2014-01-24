/*
*
* This is the Kattegat application server
*
* Start it from the terminal with: 'node app'
*
*/
var livereload = require('express-livereload')
var express = require('express');
var http = require('http');
var path = require('path');

// Configure the server
// 		For help customising the app server,
// 		see the Express docs: http://expressjs.com/
var app = express();

// Set up server
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
app.use("/lib", express.static(path.join(__dirname, 'bower_components')));

// Create Kattegat
var kattegat = require("kattegat")(app);

// Add kattegat middleware
app.use(kattegat.store());

// Add error handling
app.use(express.errorHandler());

// Add realtime features
var server = http.createServer(app);
kattegat.realtime(server);

// Reload when we change the sources
livereload(app);

// Start the server
server.listen(app.get('port'), function(){
  console.log('<%= appName %> has started; you can access it from one of these addresses');
  kattegat.util.hintUrls(app.get('port'));
  console.log("\nTo access your server from another device, make sure it's on the same network.")
});
