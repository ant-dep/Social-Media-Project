// Import
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/usersCtrl');
const passValidate = require('../middleware/passValidate');
const rateLimit = require("express-rate-limit");
const multer = require('../middleware/multer-config');

// Limits the number of try per connection
const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // then blocks for 5mn
    max: 5, // max 5 try
    message: " Trop de tentatives échouées, réessayez dans 5 minutes",
});

// ----------  USERS ROUTES  ----------  //
router.post('/signup', passValidate, usersCtrl.signup);
router.post('/login', rateLimiter, usersCtrl.login);
router.get('/profile', usersCtrl.findByPk);
router.get('/', usersCtrl.findAll);
router.delete('/:id', usersCtrl.delete);
router.put('/:id', multer, usersCtrl.update);

module.exports = router;