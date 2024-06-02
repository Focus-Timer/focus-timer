var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('login', { name: 'Focus Timer' });
});

// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

/* GET home page. */
router.get('/home', (req, res) => {
  res.render('home');
});

module.exports = router;