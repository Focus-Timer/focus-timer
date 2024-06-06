require("dotenv").config();

let allowedOrigins = [process.env.HOSTED_URL]

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (!origin) {
      // Allow requests with no origin (like from Postman or curl)
      callback(null, true);
    } else if (allowedOrigins.origin.includes(origin)) {
      // Allow if the origin is in the allowedOrigins list
      callback(null, true);
    } else {
      // Reject if the origin is not in the allowedOrigins list
      callback(new Error('Not allowed by CORS'));
    }
  }
};

module.exports = corsOptions;
