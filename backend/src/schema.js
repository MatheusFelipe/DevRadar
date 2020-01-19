const { gql } = require('apollo-server');

const services = require('./services');
const mergeResolvers = require('./utils/mergeResolvers');

const baseTypeDefs = gql`
  type Mutation {
    empty: Boolean
  }
  type Subscription {
    empty: Boolean
  }
  type Query {
    empty: Boolean
  }
`;

const baseResolvers = {
  Mutation: { empty: () => null },
  Subscription: { empty: () => null },
  Query: { empty: () => null },
};

module.exports = {
  typeDefs: [baseTypeDefs].concat(services.typeDefs),
  resolvers: mergeResolvers(baseResolvers, services.resolvers),
};
