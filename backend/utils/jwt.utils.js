const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0jyfhg24345dhghtdhluoczmxpt64dklmb5673mlgiwyapf4gmlkd78dflkt54';

// Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            JWT_SIGN_SECRET, {
                expiresIn: '6h'
            })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) {}
        }
        return userId;
    }
}