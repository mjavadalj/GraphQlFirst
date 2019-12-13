const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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