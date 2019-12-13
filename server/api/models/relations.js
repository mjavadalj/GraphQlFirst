const Task = require('./task');

Task.hasMany(Task, {
    foreignKey: 'taskId',
    targetKey: 'taskId',
    as: 'relatedTask'
});