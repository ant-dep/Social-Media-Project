'use strict';

// ----------  MAIN PAGE MODEL CREATED via SEQUELIZE ----------  //
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// From here are specific orders

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) { // a model is a DB table
        db[modelName].associate(db);
    }
});

db.user = require("./user")(sequelize, Sequelize)
db.post = require("./post")(sequelize, Sequelize)
db.comment = require("./comment")(sequelize, Sequelize)
db.like = require("./like")(sequelize, Sequelize)

db.user.hasMany(db.post);

db.post.belongsTo(db.user, {
    foreignKey: "userId",
});

// comments
db.user.hasMany(db.comment);

db.comment.belongsTo(db.user, {
    foreignKey: "userId",
});
db.post.hasMany(db.comment);

db.comment.belongsTo(db.post, {
    foreignKey: "postId",
});

// likes
db.user.hasMany(db.like);

db.like.belongsTo(db.user, {
    foreignKey: "userId",
});
db.post.hasMany(db.like);

db.like.belongsTo(db.post, {
    foreignKey: "postId",
});

module.exports = db;