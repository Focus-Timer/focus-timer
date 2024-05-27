const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { join } = require("path");
require('dotenv').config({ override: true }); // Load environment variables from .env file

const PORT = process.env.PORT || process.env.PORT_LOCAL || 80;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Or pug, or whatever

// if (process.env.MODE === 'debug') {
app.use(logger('dev')); // Middleware to log requests
// }
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files

// Routes
let viewRouter = require('./routes/view');

// Mount routers
app.use('/', viewRouter);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

