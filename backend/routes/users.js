// Import
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const passValidate = require('../middleware/passValidate');
const rateLimit = require("express-rate-limit");
const multer = require('../middleware/multer-config');
const usersCtrl = require('../controllers/usersCtrl');

// Limits the number of try per connection
const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // then blocks for 5mn
    max: 5, // max 5 try
    message: " Trop de tentatives échouées, réessayez dans 5 minutes",
});

// ----------  USERS ROUTES  ----------  //
router.post('/signup', passValidate, usersCtrl.signup);
router.post('/login', rateLimiter, usersCtrl.login);
router.get('/profile', auth, usersCtrl.findOne);
router.get('/', auth, usersCtrl.findAll);
router.delete('/:id', auth, usersCtrl.delete);
router.put('/:id', auth, multer, usersCtrl.update);

module.exports = router;