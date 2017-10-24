const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const app = express();

const schema = require('./schema');

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000);

console.log('listening');