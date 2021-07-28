'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // N to M assiciation from Post to User through Comment
            models.User.belongsToMany(models.Post, {
                through: models.Comment,
                foreignKey: 'userId',
                otherKey: 'postId',
            });
            models.Post.belongsToMany(models.User, {
                through: models.Comment,
                foreignKey: 'postId',
                otherKey: 'userId',
            });

            // Links from Tables and the foreign key
            models.Comment.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            });
            models.Comment.belongsTo(models.Post, {
                foreignKey: {
                    allowNull: false
                }
            });
        }
    };
    Comment.init({
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Comment',
        paranoid: true,
    });
    return Comment;
};