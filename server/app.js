const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const sequelize = require('./api/models/connection');
const Task = require('./api/models/task');

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

require('./api/models/relations');

sequelize.sync();


app.use('/graphql', graphQlHttp({

    schema: buildSchema(`
        type Task {
            taskId: String!
            title: String!
            description: String!
            dueDate: String!
            related: [String!]!
        }

        input TaskInput {
            title: String!
            description: String!
            dueDate: String!
            related: [String]
        }

        type RootQuery {
            tasks: [Task!]!
        }

        type RootMutation {
            createTask(taskInput: TaskInput): Task
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
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
    },
    graphiql: true

})
);

module.exports = app;