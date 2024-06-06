var express = require('express');
var router = express.Router();
const cors = require("cors");
const corsOptions = require('../config/cors-middleware');
const verifyToken = require('../config/auth-middleware');
// const authenticateSession = require('../config/auth-middleware.js');

router.get("/hello", cors(corsOptions), (req, res) => {
  console.log("Hello start");
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.send({ message: "Hello, server alive" }).status(200);
});

router.get('/protected', verifyToken, (req, res) => {
  res.send(`Hello ${req.user.username}, your access token is valid!`);
});

module.exports = router;