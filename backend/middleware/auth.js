const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // get the token in the request's header
        const token = req.headers.authorization.split(' ')[1];
        // compare it to the one saved
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // compare the User'Id linked to the token
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.token = token;
            req.user = userId;
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};