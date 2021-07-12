'use strict';
const {
    Model
} = require('sequelize');

// ----------  COMMENTS MODEL CREATED via SEQUELIZE ----------  //
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // N to M assiciation from Post to User through Like
            models.User.belongsToMany(models.Post, {
                through: models.Like,
                foreignKey: 'userId',
                otherKey: 'postsId',
            });
            models.Post.belongsToMany(models.User, {
                through: models.Like,
                foreignKey: 'postsId',
                otherKey: 'userId',
            });

            // Links from Tables and the foreign key
            models.Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
            models.Comment.belongsTo(models.Post, {
                foreignKey: 'postsId',
                as: 'post',
            });
        }
    };
    Comment.init({
        content: DataTypes.STRING,
        usersId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        postsId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Post',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};