const bcrypt = require("bcrypt");
const MaskData = require("maskdata");
const jwtUtils = require('../utils/jwt.utils');
const db = require("../models/index");
const User = db.user;
const asyncLib = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// hide emails details for confidentiality
const emailMaskOptions = {
    maskWith: "*",
    unmaskedStartCharactersBeforeAt: 1,
    unmaskedEndCharactersAfterAt: 1,
    maskAtTheRate: false,
};
// ----------  CRUD MODEL  ----------  //

// ----------  SIGN UP  (CREATE) ----------  //
exports.signup = async(req, res, next) => {

        // Params
        const email = MaskData.maskEmail2(req.body.email, emailMaskOptions);
        const pseudo = req.body.pseudo;
        const password = req.body.password;

        // Checking if any of inputs are blanks
        if (req.body.pseudo == null || req.body.email == null || req.body.password == null) {
            return res.status(400).json({ 'error': 'Merci de renseigner tous les champs !' });
        }
        // Checking required pseudo length
        if (req.body.pseudo.length >= 13 || req.body.pseudo.length <= 4) {
            return res.status(400).json({ 'error': 'wrong pseudo (must be length 5 - 12)' });
        }
        // Checking required email format
        if (!EMAIL_REGEX.test(req.body.email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }

        // Using Waterfall to enchain functions
        asyncLib.waterfall([

                // 1. Checks if User exists
                function(done) { // done = main parameter
                    User.findOne({
                            attributes: ['email'],
                            where: { email: email }
                        })
                        .then(function(userFound) { // userFound will be next parameter
                            done(null, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                },

                // 2. If not, Hash the password
                function(userFound, done) { // keeping done as main param and adding previous param
                    if (!userFound) {
                        // 12 loops of encrypting (default recommended)
                        bcrypt.hash(password, 12, function(err, bcryptedPassword) { // new param to add next
                            done(null, userFound, bcryptedPassword);
                        });
                    } else {
                        return res.status(409).json({ 'error': 'user already exist' });
                    }
                },

                // 3. Create User in DB
                function(userFound, bcryptedPassword, done) { // keeping previous params
                    // Use the model to create a new User
                    let newUser = User.create({
                            email: email,
                            pseudo: pseudo,
                            password: bcryptedPassword,
                            isAdmin: 0
                        })
                        .then(function(newUser) {
                            done(newUser); // final param to use
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'cannot add user' });
                        });
                }
            ],

            // 4. after created, return new User id
            function(newUser) {
                if (newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    });
                } else {
                    return res.status(500).json({ 'error': 'cannot add user' });
                }
            });
    },


    // ----------  LOGIN  (READ) ----------  //
    exports.login = (req, res, next) => {

        // Params
        const email = MaskData.maskEmail2(req.body.email, emailMaskOptions);
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([

            // 1. Checks if users exists
            function(done) {
                User.findOne({
                        where: { email: email }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },

            // 2. If so, compare password hashes
            function(userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'user not exist in DB' });
                }
            },

            // 3. If hashes matched, select user
            function(userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'invalid password' });
                }
            }

            // 4. Return userId with a unique token
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            } else {
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
        });
    },

    // ----------  FIND BY PRIMARY KEY (READ - sequelize)  ----------  //
    exports.findByPk = (req, res) => {
        User.findByPk(req.params.id).then((user) => {
            res.status(200).json({
                status: true,
                data: user,
            });
        });
    };

// ----------  UPDATE  ----------  //
exports.update = (req, res) => {

    const id = req.params.id;
    User.update({
        pseudo: req.body.pseudo,
        email: MaskData.maskEmail2(req.body.email),
        password: hash,
        isAdmin: 0
    }, { where: { id: id } }).then(() => {
        res.status(200).json({
            status: true,
            message: "Utilisateur modifié avec id = " + id
        });
    });
};

// ----------  DELETE  ----------  //
exports.delete = (req, res) => {

    const id = req.params.id;
    User.destroy({
            where: { id: id }
        })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
        .catch(error => res.status(500).json({ error }));
};