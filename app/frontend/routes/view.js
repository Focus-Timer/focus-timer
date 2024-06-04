var express = require('express');
var router = express.Router();
require('dotenv').config({ override: true });

router.get('/', function (req, res, next) {
  const clientId = process.env.COGNITO_CLIENT_ID;
  res.render('login', { clientId });
});

// Render login page
router.get('/login', (req, res) => {
  const clientId = process.env.COGNITO_CLIENT_ID;
  res.render('login', { clientId });
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

/* GET home page. */
router.get('/home', (req, res) => {
  const clientId = process.env.COGNITO_CLIENT_ID;
  res.render('home', { clientId });
});

module.exports = router;