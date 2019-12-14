const Sequelize = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tasks: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    }

});
module.exports = User;