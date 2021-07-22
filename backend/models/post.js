'use strict';
const {
    Model
} = require('sequelize');

// ----------  POST MODEL CREATED via SEQUELIZE ----------  //
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // associate the post to its user id
            models.Post.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            });
            models.Post.hasMany(models.Comment);
            models.Post.hasMany(models.Like);
        }
    };
    Post.init({
        content: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        likes: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};