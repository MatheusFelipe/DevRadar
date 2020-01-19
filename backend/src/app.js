require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const uuid = require('uuid/v4');
const { typeDefs, resolvers } = require('./schema');
const serviceLoaders = require('./services/loaders');

module.exports = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      const reqId = uuid();
      serviceLoaders.startRequestLoaders(reqId);
      return { reqId };
    },
    formatResponse: (response, { context }) => {
      serviceLoaders.resetRequestLoaders(context.reqId);
      return response;
    },
  });

  const app = express();
  server.applyMiddleware({ app, cors: true });

  app.use(bodyParser.text({ limit: '10mb', extended: true }));
  app.use(helmet());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

  return app;
};
