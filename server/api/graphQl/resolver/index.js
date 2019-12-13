

const Task = require('../../models/task');

module.exports = {
    tasks: () => {
        return Task.findAll({ attributes: ['title', 'description'] }).then(tasks => {
            return tasks;
        }).catch(err => { return err })
    },
    createTask: (args) => {
        const task = Task.create({
            taskId: "22", //TODO: Do something with this shit ! may be graphQl ID ??
            title: args.taskInput.title,
            description: args.taskInput.description,
            dueDate: new Date().toISOString(),
            related: args.taskInput.related
        }).then(result => {
            console.log(result);
            return result;

        }).catch(err => {
            console.log(err)
            return err;
        })
        return task;
    }
}