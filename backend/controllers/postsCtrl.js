const db = require("../models/index");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const asyncLib = require('async');

// ----------  CRUD MODEL  ----------  //

const ITEMS_LIMIT = 50;

// ----------  CREATE  ----------  //
exports.createPost = (req, res, next) => {

    // Checks if there is a file and define its address or leave it blank
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

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

        // 2. If found, create the post with inputs
        function(userFound, done) {
            if (userFound) {
                Post.create({
                        content: req.body.content,
                        imageUrl: imageUrl,
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

    asyncLib.waterfall([

            // 2. If found, get all posts by pseudo
            function(done) {
                Post.findAll({
                    // Never Trust User Inputs -> test them
                    order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
                    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                    limit: (!isNaN(limit)) ? limit : null,
                    offset: (!isNaN(offset)) ? offset : null,
                    include: [{ // Links the post with User and Comments tables
                        model: User,
                        Comment,
                        attributes: ['pseudo', 'imageUrl', 'isAdmin']
                    }]
                }).then(function(posts) {
                    done(posts)
                }).catch(function(err) {
                    console.log(err);
                    res.status(500).json({ "error": "invalid fields" });
                });
            },
            // 3. if done, confirm it
        ],
        function(posts) {
            if (posts) {
                return res.status(201).json(posts);
            } else {
                return res.status(500).json({ 'error': 'cannot send post' });
            }
        })
};

// ----------  DELETE  ----------  //
exports.deletePost = (req, res, next) => {

    // Soft-deletion modifying the post the ad a timestamp to deletedAt
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ message: "Post introuvable", error: error }))
};