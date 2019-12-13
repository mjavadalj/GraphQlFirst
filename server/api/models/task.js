const Sequelize = require('sequelize');
const sequelize = require('./connection');

const Task = sequelize.define('task', {
    taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dueDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    related: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    }
});

module.exports = Task;