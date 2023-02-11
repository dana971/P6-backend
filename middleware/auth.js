const jwt = require('jsonwebtoken');


/**
 * ToDo: next() vraiment nécessaire ?
 * Fonction d'authentification
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_USER_TOKEN );
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};