'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
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
            models.Like.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
            models.Like.belongsTo(models.Post, {
                foreignKey: 'postsId',
                as: 'post',
            });
        }
    };
    Like.init({
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Post',
                key: 'id'
            }
        },
        isLike: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};