var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
const mongoose = require('mongoose')
const session = require('express-session');
// session存储模块
const MongoStore = require('connect-mongo')(session);
//引入routes.js路由文件
const routes = require('./routes');
// 导入设置文件
const setting = require('./setting');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'sss',
  store: new MongoStore({
    url: 'mongodb://localhost/film'
  }),
  resave: false,
  saveUninitialized: true,
  name: 'ssss'
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
// app.get('/', function(req, res){
//   res.json({error:0})
// })
// app.use('/', index);
// app.use('/users', users);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(2222, () => {
  console.log('node is OK 2222...');
})
module.exports = app;
