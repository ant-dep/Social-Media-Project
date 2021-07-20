const db = require("../models/index");
const jwt = require('../middleware/auth');
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const fs = require('fs');
const asyncLib = require('async');

// ----------  CRUD MODEL  ----------  //

const CONTENT_LIMIT = 2;
const ITEMS_LIMIT = 50;

// ----------  CREATE  ----------  //
exports.createPost = (req, res, next) => {
    // Getting auth header
    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    // Params
    const content = req.body.content;
    // Checks if there is a file and define its address or leave it blank
    const imageUrl = req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

    if (content == null) {
        return res.status(400).json({ 'error': 'missing body' });
    }

    asyncLib.waterfall([

        // 1. Get the user to be linked with the post
        function(done) {
            User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },

        // 2. If found, create the post with inputs
        function(userFound, done) {
            if (userFound) {
                Post.create({
                        content: content,
                        imageUrl: imageUrl,
                        likes: 0,
                        UserId: userFound.id
                    })
                    .then(function(newPost) {
                        done(newPost);
                    });
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },

        // 3. if done, confirm it
    ], function(newPost) {
        if (newPost) {
            return res.status(201).json(newPost);
        } else {
            return res.status(500).json({ 'error': 'cannot send post' });
        }
    })
};


// ----------  READ  ----------  //
exports.findAll = (req, res) => {

    const fields = req.query.fields; // DB table fields to load
    const limit = parseInt(req.query.limit); // Limits the number..
    const offset = parseInt(req.query.offset); // ..of posts loaded
    const order = req.query.order;

    if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
    }
    // Get all posts by pseudo
    Post.findAll({
        // Never Trust User Inputs -> test them
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{ // Links the post with User and Comments tables
            model: User,
            Comment,
            attributes: ['pseudo']
        }]
    }).then(function(posts) {
        if (posts) {
            res.status(200).json(posts); // Then loads them
        } else {
            res.status(404).json({ "error": "no post found" });
        }
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({ "error": "invalid fields" });
    });
};

// ----------  UPDATE  ----------  //
exports.modifyPost = (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwt.getUserId(headerAuth);

    if (!req.body) {
        return res.status(400).send({
            message: "Votre message modifié ne peut pas être vide"
        });
    }
    const id = userId;

    Post.modifyPost(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Impossible de modifier le post avec id=${id}`
                });
            } else res.send({ message: "Post modifié avec succes ! " });
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur avec la modification ud post avec l'id" + id });
        });
};

// ----------  DELETE  ----------  //
exports.deletePost = (req, res, next) => {

    Post.findOne({
            where: {
                id: req.params.id
            }
        }).then(post => {
            // Checking if there is a file attached with the post
            if (post.imageUrl !== null) {
                const filename = post.imageUrl.split('/images/')[1]; // get the filename
                fs.unlink(`images/${filename}`, () => { // delete the file
                    Post.destroy({ where: { id: req.params.id } }) // then delete the post
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
            // Just delete the post if no file attached
            Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ message: "Post introuvable", error: error }))
};