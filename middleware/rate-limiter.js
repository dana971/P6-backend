const rateLimit = require("express-rate-limit");

/**
 * Paramétrage du Rate-limiter
 * Limitation du nombre de requête faite à l'api
 * //@param {Object} PassedOptions
 * //@returns {Object} Retrns RateLimitRequestHandler | LegacyStore
 */
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message:"Vous avez atteint le nombre maximum d'essai. Essayez de vous connecter dans 30 min",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = rateLimiter;