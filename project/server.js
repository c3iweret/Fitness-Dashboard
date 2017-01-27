var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var weather = require('./routes/weather');
var dbObj = require('./config/db');
var db = dbObj.db;
var usersDB = db.collection('users');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var passport = require('passport');
var flash = require('connect-flash');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./routes/auth');

mongoose = require('mongoose')
mongoose.connect(dbObj.connectionURI)

var app = express();
app.use(helmet());
app.use(compression());

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Passport Login session
require('./config/passport')(passport);
app.use(session({store: new mongoStore({url: dbObj.connectionURI}),
  secret: 'secret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: true,
  resave: false
}))
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions
app.use(flash());  // use connect-flash for flash messages stored in session
require('./routes/signup')(app, passport);
require('./routes/login')(app, passport);


// ROUTING

var users = require('./routes/users');
var index = require("./routes/index");
var calendar = require('./routes/calendar');
var recipes = require('./routes/recipes');
var exercise = require('./routes/exercise');
// var login = require('./routes/login');
var feed = require('./routes/feed');
var projections = require('./routes/projections');
var feedback = require('./routes/feedback');
var todo = require('./routes/todo');
var home = require('./routes/home');

app.use('/index', index); // homepage -- change to dash later
app.use('/users', users);
app.use('/calendar', calendar);
app.use('/recipes', recipes);
app.use('/exercise', exercise);
// app.use('/login', login);
app.use('/feed', feed);
app.use('/weather', weather);
app.use('/projections', projections);
app.use('/feedback', feedback);
app.use('/todo', todo);
app.use('/', home);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//listen to port
app.listen(8000);
console.log('listening on port 8000!');
module.exports = app;
