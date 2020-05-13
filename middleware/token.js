const secretKey = process.env.AUTH_SECRET;
const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[0]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, secretKey)
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.user = payload.subject
    next()
}