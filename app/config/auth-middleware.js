require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (debug_mode) {
    req.user = { sub: req.headers.authorization, username: "Josh" };
    return next();
  }

  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  try {
    const jwksClient = jwksRsa({
      cache: true,
      rateLimit: true,
      jwksUri: `https://cognito-idp.{process.env.AWS_REGION}.amazonaws.com/{userpoolid}/.well-known/jwks.json` // Replace with User Pool ID
    });

    function getKey(header, callback) {
      jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err) {
          callback(err);
        } else {
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        }
      });
    }

    jwt.verify(token, getKey, {
      audience: 'your_client_id', // Replace with Cognito App Client ID
      issuer: `https://cognito-idp.{process.env.AWS_REGION}.amazonaws.com/{userpoolid}`, // Replace with User Pool ID
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        return res.status(401).send('Access token is invalid');
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;