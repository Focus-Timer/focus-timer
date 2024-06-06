
let allowedOrigins = ["https://rudolph-sucks.projects.bbdgrad.com", "https://localhost"]

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin) {
          // Allow requests with no origin (like from Postman or curl)
          callback(null, true);
      } else if (allowedOrigins.includes(origin)) {
          // Allow if the origin is in the allowedOrigins list
          callback(null, true);
      } else {
          // Reject if the origin is not in the allowedOrigins list
          callback(new Error('Not allowed by CORS'));
      }
  }
};

module.exports = corsOptions;
