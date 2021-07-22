const db = require("../models/index");
const Comment = db.comment;
const User = db.user;
const jwt = require('../middleware/auth');
const asyncLib = require('async');

// ----------  CREATE  ----------  //
exports.createComment = (req, res, next) => {

    // Getting auth header
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    // Params
    const comment = {
        content: req.body.content,
        userId: req.body.userId,
        postId: req.body.postId
    }

    if (comment.content == null) {
        return res.status(400).json({ 'error': 'missing body' });
    }

    asyncLib.waterfall([

        // 1. Get the user to be linked with the comment
        function(done) {
            User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' + err });
                });
        },

        // 2. If found, create comment with input
        function(userFound, done) {
            if (userFound) {
                // Create the post and save it in DB
                Comment
                    .create(comment)
                    .then(function(newComment) {
                        done(newComment)
                    })
                    .catch(() => res.status(400).json({ message: "erreur commentaire controller" }));
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },

        // 3. if done, confirm it
    ], function(newComment) {
        if (newComment) {
            return res.status(201).json(newComment);
        } else {
            return res.status(500).json({ 'error': 'cannot send comment' });
        }
    })
};

// ----------  READ ALL  ----------  //
exports.getAllComments = (req, res, next) => {

    // Getting auth header
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    asyncLib.waterfall([

        // 1. Get the user to be linked with the comment
        function(done) {
            User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' + err });
                });
        },

        // 2. If found, create comment with input
        function(userFound) {
            if (userFound) {
                Comment.findAll({})
                    .then(comment => res.status(200).json(comment))
                    .catch(() => res.status(400).json({ error: "Erreur lors de l'affichage des commentaires" }))
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },

        // 3. if done, confirm it
    ], function(Comment) {
        if (Comment) {
            return res.status(201).json(Comment);
        } else {
            return res.status(500).json({ 'error': 'cannot send comment' });
        }
    })
};