require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const debug_mode = process.env.MODE === 'debug';



function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  try {
    const jwksClient = jwksRsa({
      cache: true,
      rateLimit: true,
      jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json` // Replace with User Pool ID
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
      audience: process.env.COGNITO_CLIENT_ID, // Replace with Cognito App Client ID
      issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`, // Replace with User Pool ID
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        return res.status(401).send('Access token is invalid');
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error when verifying token' });
  }
};

module.exports = verifyToken;
// const { CognitoJwtVerifier } = require("aws-jwt-verify");
 
// const verifier = CognitoJwtVerifier.create({
//   userPoolId: process.env.COGNITO_USER_POOL_ID,
//   tokenUse: "id",
//   clientId: process.env.COGNITO_CLIENT_ID,
// });
 
// const authenticateSession = async (req, res, next) => {
//   try {
//     const token = req?.headers?.authorization?.split(" ")[1];
//     const payload = await verifier.verify(token);
//     req.user = payload;
//     next(); // Pass control to the next middleware function
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };
 
// module.exports = authenticateSession;