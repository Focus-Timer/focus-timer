var express = require('express');
var router = express.Router();
const cors = require("cors");
const corsOptions = require('../config/cors-middleware.js');
var verifyToken = require('../config/auth-middleware.js');
var UserService = require('../services/user-service.js');
// const authenticateSession = require('../config/auth-middleware.js');

router.put('/signIn', cors(corsOptions), verifyToken, async (req, res, next) => {
  try {
    const user = await UserService.signIn(req.user);
    if (!user) {
      return res.status(404).send({ message: 'Could not sign in' });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/getUser', cors(corsOptions), verifyToken, async (req, res) => {
  try {
    const user = await UserService.getUser(req.user);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ user });
  } catch {
    console.error('Error retrieving user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
