var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors')

require('dotenv').config()


let mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  

 const connectionUrl= 'mongodb+srv://Prudhvi007:827JlqwB20NqvqLB@cluster0.kloacwu.mongodb.net/MyAccounts?retryWrites=true&w=majority';
 
  await mongoose.connect(connectionUrl);
  

}



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountsRouter = require('./routes/accounts');

const { forLogin, forSignup } = require('./controllers/accounts');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);

app.use('/login', forLogin);
app.use('/signup', forSignup);

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
