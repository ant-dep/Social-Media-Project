const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async'); // to warp functions within a Waterfall

// Constants
const DISLIKED = 0;
const LIKED = 1;

// Routes
module.exports = {


    // ----------  LIKE ----------  //

    likePost: function(req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        // Params
        const postId = parseInt(req.params.postId);

        // Checking if post id is valid
        if (postId <= 0) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        asyncLib.waterfall([

            // 1. Checking if post exists
            function(done) {
                models.Post.findOne({
                        where: { id: postId }
                    })
                    .then(function(postFound) {
                        done(null, postFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify post' });
                    });
            },

            // 2. Checks if post found
            function(postFound, done) {
                if (postFound) {
                    // Get the user object
                    models.User.findOne({
                            where: { id: userId }
                        })
                        .then(function(userFound) {
                            done(null, postFound, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'post already liked' });
                }
            },

            // 3. Checks if user is found
            function(postFound, userFound, done) {
                if (userFound) {
                    // Checks if inside Like table, there is the user and the post ids
                    models.Like.findOne({
                            where: {
                                userId: userId,
                                postId: postId
                            }
                        })
                        .then(function(userAlreadyLikedFound) {
                            // Allow to know if this user already liked the post
                            done(null, postFound, userFound, userAlreadyLikedFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
                        });
                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },

            // 4. Checks if user already liked
            function(postFound, userFound, userAlreadyLikedFound, done) {
                if (!userAlreadyLikedFound) {
                    // Add realtion between User and Like
                    postFound.addUser(userFound, { isLike: LIKED })
                        .then(function(alreadyLikeFound) {
                            done(null, postFound, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to set user reaction' });
                        });
                } else {
                    // Checks if users Disliked the post
                    if (userAlreadyLikedFound.isLike === DISLIKED) {
                        userAlreadyLikedFound.update({
                            // and turns it in Liked
                            isLike: LIKED,
                        }).then(function() {
                            done(null, postFound, userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot update user reaction' });
                        });
                    } else {
                        res.status(409).json({ 'error': 'post already liked' });
                    }
                }
            },

            // 5. Increment number of likes
            function(postFound, userFound, done) {
                postFound.update({
                    // get the actual number and and add 1
                    likes: postFound.likes + 1,
                }).then(function() {
                    done(postFound);
                }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot update post like counter' });
                });
            },

            // 6. Upload the modified post
        ], function(postFound) {
            if (postFound) {
                return res.status(201).json(postFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update post' });
            }
        });
    },


    // ----------  DISLIKE ----------  //

    dislikePost: function(req, res) {
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);
        const postId = parseInt(req.params.postId);

        if (postId <= 0) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        // The same than LIKE but reverse
        asyncLib.waterfall([
            function(done) {
                models.Post.findOne({
                        where: { id: postId }
                    })
                    .then(function(postFound) {
                        done(null, postFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify post' });
                    });
            },
            function(postFound, done) {
                if (postFound) {
                    models.User.findOne({
                            where: { id: userId }
                        })
                        .then(function(userFound) {
                            done(null, postFound, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'post already liked' });
                }
            },
            function(postFound, userFound, done) {
                if (userFound) {
                    models.Like.findOne({
                            where: {
                                userId: userId,
                                postId: postId
                            }
                        })
                        .then(function(userAlreadyLikedFound) {
                            done(null, postFound, userFound, userAlreadyLikedFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
                        });
                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            function(postFound, userFound, userAlreadyLikedFound, done) {
                if (!userAlreadyLikedFound) {
                    postFound.addUser(userFound, { isLike: DISLIKED })
                        .then(function(alreadyLikeFound) {
                            done(null, postFound, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to set user reaction' });
                        });
                } else {
                    if (userAlreadyLikedFound.isLike === LIKED) {
                        userAlreadyLikedFound.update({
                            isLike: DISLIKED,
                        }).then(function() {
                            done(null, postFound, userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot update user reaction' });
                        });
                    } else {
                        res.status(409).json({ 'error': 'post already disliked' });
                    }
                }
            },
            function(postFound, userFound, done) {
                postFound.update({
                    likes: postFound.likes - 1,
                }).then(function() {
                    done(postFound);
                }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot update post like counter' });
                });
            },
        ], function(postFound) {
            if (postFound) {
                return res.status(201).json(postFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update post' });
            }
        });
    }
}