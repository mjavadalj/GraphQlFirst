const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const graphQlHttp = require('express-graphql');
const sequelize = require('./api/models/connection');
const graphQlSchema = require('./api/graphQl/schema/index');
const graphQlResolver = require('./api/graphQl/resolver/index');

app.use(bodyParser.urlencoded({ extended: false }));
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

    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true

})
);

module.exports = app;