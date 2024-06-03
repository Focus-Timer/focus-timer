const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { join } = require("path");
require('dotenv').config({ override: true }); // Load environment variables from .env file
const fs = require('fs');
const https = require('https');
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || process.env.PORT_LOCAL || 80;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs'); // Or pug, or whatever

if (process.env.MODE === 'debug') {
  app.use(logger('dev')); // Middleware to log requests
}
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.static(path.join(__dirname, 'frontend/public'))); // Middleware to serve static files
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
// Apply the limiter to all requests
app.use(limiter);

// Routes
let viewRouter = require('./frontend/routes/view');
//handler
let otherHandler = require('./backend/handlers/other');
let userHandler = require('./backend/handlers/user-handler');
let reportHandler = require('./backend/handlers/report-handler');
// Mount routers
app.use('/', viewRouter);
// Mount API handlers
app.use('/api/user', userHandler);
app.use('/api/report', reportHandler);
app.use('/api/other', otherHandler);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.MODE === 'local' || process.env.MODE === 'debug') {
  const key = fs.readFileSync('./certs/localhost.decrypted.key');
  const cert = fs.readFileSync('./certs/localhost.crt');
  const server = https.createServer({ key, cert }, app);
  server.listen(PORT, () => {
    console.log(`Server is listening over HTTPs on https://localhost:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server is listening over HTTP on http://localhost:${PORT}`);
  });
}



