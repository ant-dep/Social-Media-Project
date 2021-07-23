const db = require("../models/index");
const Comment = db.comment;
const User = db.user;
const jwt = require('../middleware/auth');
const asyncLib = require('async');

// ----------  CREATE  ----------  //
exports.createComment = (req, res, next) => {

    asyncLib.waterfall([

        // 1. Get the user to be linked with the post
        function(done) {
            User.findOne({
                    where: { id: req.body.userId }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },

        // 2. If found, create comment with input
        function(userFound, done) {
            if (userFound) {
                // Create the post and save it in DB
                Comment.create({
                        content: req.body.content,
                        userId: req.body.userId,
                        postId: req.body.postId
                    })
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

// ----------  DELETE  ----------  //
exports.deleteComment = (req, res, next) => {

    Comment.findOne({
            where: {
                id: req.params.id
            }
        }).then(comment => {
            if (comment) {
                Comment.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Comment supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ message: "Comment introuvable", error: error }))
};