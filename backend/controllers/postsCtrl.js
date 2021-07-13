const db = require("../models/index");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
const fs = require('fs');

// ----------  CRUD MODEL  ----------  //

// ----------  CREATE  ----------  //
exports.createPost = (req, res, next) => {

    // Checking if the post is blank
    if (req.body.content == null) {
        return res.status(400).send({
            message: "Votre message ne peut pas être vide"
        });
    }
    console.log(req.body);
    const post = {
        content: req.body.content,
        // Getting auth header
        headerAuth: req.headers['authorization'],
        userId: jwtUtils.getUserId(headerAuth),
        // Checks if there is a file and define its address or leave it blank
        imageUrl: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    };
    // Save the post
    Post.create(post)
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(() => res.status(400).json({ message: "erreur post controller" }));
};

// ----------  READ  ----------  //
exports.findAll = (req, res) => {

    Post.findAll({
            include: [{
                model: User,
                Comment,
                attributes: ['pseudo']
            }],
            // Loads post most recent first
            order: [
                ['createdAt', 'DESC']
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération"
            });
        });
};

// ----------  UPDATE  ----------  //
exports.modifyPost = (req, res, next) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Votre message modifié ne peut pas être vide"
        });
    }
    const id = req.params.id;

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