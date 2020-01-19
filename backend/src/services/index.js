const DevsService = require('./devs');
const mergeResolvers = require('../utils/mergeResolvers');

const services = [];

services.push(DevsService);

module.exports = {
  typeDefs: services.map(s => s.typeDefs),
  resolvers: services.reduce((acc, s) => mergeResolvers(acc, s.resolvers), {}),
};
