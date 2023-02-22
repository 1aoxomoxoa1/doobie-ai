var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session')


var lobbyRouter = require('./routes/lobby');
var namePageRouter = require('./routes/name-page');
var joinRoomRouter = require('./routes/join-room');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const corsObj = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsObj));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//line to work with deployment
app.set("trust proxy", 1);

//session information (middleware)
app.use(session({
  key: "userid",
  secret: "subscribe",
  resave: false,
  saveUninitialized: true,
  name: "DoobieUserSession",
  cookie: {
      expires: 60*60*24*24,
      secure: app.get('env') === 'production'? true : false,
      sameSite: app.get('env') === 'production' ? 'none':'lax' 
  }
}));

//use the routes as middleware
app.use('/', namePageRouter);
app.use('/lobby', lobbyRouter);
app.use('/join-room', joinRoomRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
