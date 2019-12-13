const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
//const Sequelize = require('sequelize');
const sequelize = require('./api/models/connection');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//const sequelize = new Sequelize('postgres://bygoadwv:K3zKb5UZ-nYk3mAevW1LQtPHRpBNIUzT@rajje.db.elephantsql.com:5432/bygoadwv');
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


app.get('/graphql', graphQlHttp({

    schema: buildSchema(`
        type Event {
            taskId: ID!
            title: String!
            description: String!
            dueDate: String!
            related: [String!]!
        }
        input EventInput {
            title: String!
            description: String!
            dueDate: String!
            related: [String!]!

        }
        type rootQuery {
            events: [Event!]!
        }
        type rootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema{
            query: rootQuery
            mutation: rootMutation
        }
    `),
    rootValue: {
        events: () => {
            return //TODO: Something;
        },
        createEvent: (args) => {
            const event = {
                taskId: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                dueDate: new Date().toISOString(),
                related: args.eventInput.related
            }
            return event;
        }
    },
    graphiql: true

})
);

module.exports = app;