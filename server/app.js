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
        type Event {
            taskId: String!
            title: String!
            description: String!
            dueDate: String!
            related: [String!]!
        }

        input EventInput {
            title: String!
            description: String!
            dueDate: String!
            related: [String]
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Task.findAll({ attributes: ['title', 'description'] }).then(tasks => {
                return tasks;
            }).catch(err => { return err })
        },
        createEvent: (args) => {
            const event = Task.create({
                taskId: "2",
                title: args.eventInput.title,
                description: args.eventInput.description,
                dueDate: new Date().toISOString(),
                related: args.eventInput.related
            }).then(result => {
                console.log(result);
                return result;

            }).catch(err => {
                console.log(err)
                return err;
            })
            return event;
        }
    },
    graphiql: true

})
);

module.exports = app;