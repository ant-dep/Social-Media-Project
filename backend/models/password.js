const passwordValidator = require('password-validator');

let schema = new passwordValidator();

schema
    .is().min(6)
    .is().max(50)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = schema;