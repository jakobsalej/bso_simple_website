var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Client = require('ibmiotf');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Exposing scripts to the web app
app.use(express.static(path.join(__dirname ,'node_modules/angular' )));
app.use(express.static(path.join(__dirname ,'node_modules/angularjs-gauge/dist' )));
app.use(express.static(path.join(__dirname ,'node_modules/ibmiotf/dist' )));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// application IoT stuff
/*
var appClientConfig = {
  org: '15kw3c',
  id: 'tempapp',
  "domain": "internetofthings.ibmcloud.com",
  "auth-key": 'a-15kw3c-h3c5qm5b01',
  "auth-token": '*D_A7*-ABa6RJgdd1p'
};

var appClient = new Client.IotfApplication(appClientConfig);
appClient.connect();

// subscribe to device events
function subscribeToEvents() {
  appClient.subscribeToDeviceEvents("temp-sensor");
}

appClient.on("connect", function () {
  subscribeToEvents();
});

appClient.on("reconnect", function () {
  subscribeToEvents();
});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);

});
*/

module.exports = app;
