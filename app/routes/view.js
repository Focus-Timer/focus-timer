var express = require('express');
var router = express.Router();

/* GET home page. */
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

module.exports = router;