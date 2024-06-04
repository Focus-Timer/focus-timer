var express = require('express');
var router = express.Router();
require('dotenv').config({ override: true });
if(process.env.MODE === 'debug') {

}
router.get('/', function (req, res, next) {
  const clientId = process.env.COGNITO_CLIENT_ID;
  if(process.env.MODE !== 'production') {
    var url = process.env.LOCAL_URL
  } else {
    url = process.env.HOSTED_URL;
  }
  res.render('login', { clientId, url });
});

// Render login page
router.get('/login', (req, res) => {
  const clientId = process.env.COGNITO_CLIENT_ID;
  if(process.env.MODE !== 'production') {
    var url = process.env.LOCAL_URL
  } else {
    url = process.env.HOSTED_URL;
  }
  res.render('login', { clientId, url });
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

/* GET home page. */
router.get('/home', (req, res) => {
  const clientId = process.env.COGNITO_CLIENT_ID;
  if(process.env.MODE !== 'production') {
    var url = process.env.LOCAL_URL
  } else {
    url = process.env.HOSTED_URL;
  }
  res.render('home', { clientId, url });
});

module.exports = router;