const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

const schema = require('./schema');

app.use(cors());
app.use(bodyParser.json({ strict: false }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// app.listen(4000);
module.exports.handler = serverless(app);
console.log('listening');