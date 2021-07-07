const secretKey = process.env.AUTH_SECRET;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[0];

    if (!token) {
        return res.status(401).json('Unauthorized request');
    }

    try {
        const payload = jwt.verify(token, secretKey);

        req.user = payload.subject;

        return next();
    } catch (e) {
        return res.status(401).json('Token is not valid');
    }
};