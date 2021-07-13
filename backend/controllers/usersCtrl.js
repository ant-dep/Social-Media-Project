const bcrypt = require("bcrypt");
const db = require("../models/index");
const MaskData = require("maskdata");
const User = db.user;

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

    // Checking if any of inputs are blanks
    if (req.body.pseudo == null || req.body.email == null || req.body.password == null) {
        return res.status(400).json({ 'error': 'Merci de renseigner tous les champs !' });
        console.log('Champs complétés')
    }
    // Checking required pseudo length
    if (req.body.pseudo.length >= 13 || req.body.pseudo.length <= 4) {
        return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }
    // Checking required email format
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ 'error': 'email is not valid' });
    }
    // encrypt the password given by the user with 12 loops of encrypting (default recommended)
    bcrypt.hash(req.body.password, 12)
        .then(hash => {
            // Use the model to create a new User
            const user = new User({
                email: maskData.maskEmail2(req.body.email, emailMaskOptions),
                pseudo: req.body.pseudo,
                password: hash,
                isAdmin: 0
            });
            // save the new User
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

// ----------  LOGIN  (READ) ----------  //
exports.login = (req, res, next) => {
    // Checking if both inputs are filled
    if (!req.body.email && !req.body.password) {
        return res.status(400).json({ message: "champ manquant" })
    }
    // Checking if user already exists
    User.findOne({
            where: {
                email: MaskData.maskEmail2(req.body.email),
            }
        })
        .then((user) => {
            console.log(user);
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur inconnu' });
            }
            console.log(req.body);
            // if exists, compare the hash saved vs the one given
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Utilisateur ou mot de passe erroné' });
                    }
                    res.status(200).json({
                        // Giving a token for later requests within 24h
                        userId: user.id,
                        // Generate a unique Token via JWT file
                        token: jwtUtils.generateTokenForUser(user)
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

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