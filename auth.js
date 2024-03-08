require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.TOKEN_KEY


// Middleware to authenticate user using JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
}