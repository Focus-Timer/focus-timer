const cors = require("cors");
const express = require("express");
const sql = require('mssql')
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const { body, validationResult } = require('express-validator');
const envvars = require('dotenv').config({ path: './secrets.env' });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const debug_mode = process.env.MODE === 'debug';

if (debug_mode) {
  app.use(logger('dev')); // Middleware to log requests
}

var corsOptions = {
  origin: "*",
};

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_ENDPOINT,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.get("/hello", cors(corsOptions), (req, res) => {
  console.log("Hello start");
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.send({ message: "Hello, server alive" }).status(200);
});

app.get("/sign-in", cors(corsOptions), async (req, res, next) => {
  console.log("SIGN IN API");
  await verifyToken();
  try {
    let resp = await pool.query(`IF NOT EXISTS (select * from users where userid=@userid)
            BEGIN
              insert inot users(userid) values (@userid)
            END`);
    console.log("User signed in successfully.");
    res.send({message: "signed in", username: req.user.username}).status(200);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send({ message: "Error inserting data.", error: err });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (debug_mode) {
    req.user = { sub: req.headers.authorization, username: "Josh"};
    return next();
  }
  
  if (!token) {
    return res.status(401).send('Access token is missing');
  }

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
};

app.get('/protected', verifyToken, (req, res) => {
  res.send(`Hello ${req.user.username}, your access token is valid!`);
});

app.get("/sql", verifyToken, async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let resp = await pool
    .request()
    .input("userid", sql.VarChar, req.user.sub)
    .query(`SELECT * FROM users WHERE userid=@userid`);
    res.send({ message: resp}).status(200);
  } catch (error) {
    res.send("Database error").status(500);
  } finally {
    sql.close();
  }
  return;
});

app.get('/report', verifyToken, async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const results = await pool
    .request()
    .input("userid", sql.VarChar, req.user.sub)
    .query('SELECT * FROM report WHERE userId = @userid');
    res.json(results);
  } catch (error) {
    console.log(error)
    res.status(500).send('Database error');
  } finally {
    sql.close();
  }
  return;
});

app.post('/report', [
  verifyToken,
  body('pomodoros').isInt({ min: 1 }).withMessage('Pomodoros must be an integer greater than 0')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pomodoros } = req.body;
  console.log(req.body);
  try {
    let pool = await sql.connect(config);
    let result = await pool
    .request()
    .input("userid", sql.VarChar, req.user.sub)
    .input("pomodoros", sql.Int, pomodoros)
    .query('INSERT INTO report (userId, pomodoros) VALUES (@userid, @pomodoros)');
    res.status(201).json({datainserted:{ id: result.insertId, userId: req.user.sub, pomodoros }});
  } catch (error) {
    console.log(error);
    res.status(500).send('Database error');
  } finally {
    sql.close();
  }
});

// app.get('/report/:id', verifyToken, async (req, res) => {
//   try {
//     const [results] = await pool.query('SELECT * FROM report WHERE id = ? AND userId = ?', [req.params.id, req.user.sub]);
//     if (results.length === 0) {
//       return res.status(404).send('Report not found');
//     }
//     res.json(results[0]);
//   } catch (error) {
//     res.status(500).send('Database error');
//   } finally {
//     sql.close();
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
