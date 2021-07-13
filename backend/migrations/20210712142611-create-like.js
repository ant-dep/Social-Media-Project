'use strict';

// ----------  LIKES TABLE CREATED via SEQUELIZE ----------  //
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Likes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            postId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Posts',
                    key: 'id'
                }
            },
            isLike: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Likes');
    }
};