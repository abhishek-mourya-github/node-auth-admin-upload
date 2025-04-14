const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {

    // here the tokens are sent
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    // here we extract the token from the bearer token
    // we write the authHeader before && to check either authHeader is true or false
    // split() used to spread it and 1 means the second element of array
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied, no token provided'
        });
    }

    try {
        // here it check weather the token is valid or not
        // then using the JWT_SECRET_KEY to decode it
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedToken);

        req.userInfo = decodedToken;
        
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
