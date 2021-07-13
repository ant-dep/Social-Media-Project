const db = require("../models/index");
const Comment = db.comment;

// ----------  CREATE  ----------  //
exports.createComment = (req, res, next) => {
    // what comment refers to :
    const comment = {
        content: req.body.content,
        userId: req.body.userId,
        postId: req.params.id
    }
    console.log(req.body);
    // Create the post and save it in DB
    Comment.create(comment)
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(() => res.status(400).json({ message: "erreur commentaire controller" }));
};

// ----------  READ ALL  ----------  //
exports.getAllComments = (req, res, next) => {

    Comment.findAll({
            where: {
                postId: req.params.id
            }
        }).then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error: "Erreur lors de l'affichage des commentaires" }))
};