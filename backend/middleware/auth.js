const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        // Check the 2 second items (token) in the authorization part within headers of the request
        const token = req.headers.authorization.split(' ')[1];
        // check if the token is the same as required
        const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
        // keep the userId given in the token
        const userId = decodedToken.userId;
        // if the userId is not the same as the one saved -> error
        if (req.body.userId && req.body.userId !== userId) {
            throw 'ID utilisateur non valide!';
        } else {
            // if it's the same then keep going -> just a middleware

            req.token = token;
            req.body.userId = userId;
            /* Replace any userId given by the one decrypted in the token
             * The only authentificated userId that counts is within the token */

            next();
        }
    } catch {
        console.log('error JWT');
        return res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};