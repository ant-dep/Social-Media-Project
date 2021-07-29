const db = require("../models/index");
const Comment = db.comment;
const User = db.user;
const asyncLib = require('async');

// ----------  CREATE  ----------  //
exports.createComment = (req, res, next) => {

    // Params
    const content = req.body;

    if (content == null) {
        return res.status(400).json({ 'error': 'missing body' });
    }

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
                        UserId: userFound.id,
                        postId: req.params.id,
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

        Comment.findAll({
                include: [{ // Links the post with User and Comments tables
                    model: User,
                    attributes: ['pseudo', 'imageUrl', 'isAdmin']
                }]
            })
            .then((comment => res.status(200).json(comment)))
            .catch(error => res.status(400).json({ error: "Erreur lors de l'affichage des commentaires" }));
    },


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