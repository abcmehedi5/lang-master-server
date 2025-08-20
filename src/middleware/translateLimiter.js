const rateLimit = require("express-rate-limit");

// Rate Limiting Middleware
 const translateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { message: "Too many requests, please try again later." },
 });

 module.exports = translateLimiter
