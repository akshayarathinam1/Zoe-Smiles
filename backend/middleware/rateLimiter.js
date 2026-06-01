const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000,   // 1 minute window
  max: 30,               // max 30 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    reply: "Too many messages sent. Please wait a moment before trying again."
  }
});
