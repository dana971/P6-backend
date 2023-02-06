const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message:"Vous avez atteint le nombre maximum d'essai. Essayez de vous connecter dans 30 min",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = rateLimiter;