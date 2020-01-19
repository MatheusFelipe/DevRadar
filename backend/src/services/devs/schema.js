const { gql } = require('apollo-server');

const devsServices = require('./services');

const typeDefs = gql`
  type Coordinates {
    latitude: Float!
    longitude: Float!
  }
  type Dev {
    id: Int!
    name: String!
    githubUsername: String!
    bio: String!
    avatarUrl: String!
    createdAt: String!
    techs: [String!]!
    coordinates: Coordinates!
  }
  input CreateDevInput {
    githubUsername: String!
    techs: [String!]!
    latitude: Float!
    longitude: Float!
  }
  input UpdateDevInput {
    id: Int!
    name: String!
    avatarUrl: String!
    bio: String!
    techs: [String!]!
    latitude: Float!
    longitude: Float!
  }
  input RemoveDevInput {
    id: Int!
  }
  extend type Mutation {
    createDev(input: CreateDevInput!): Dev!
    updateDev(input: UpdateDevInput!): Dev!
    removeDev(input: RemoveDevInput!): Dev!
  }
  extend type Query {
    getDevs: [Dev!]!
    getDev(id: Int!): Dev
    getDevByGithubUsername(githubUsername: String!): Dev
    filterNearDevsByTechs(latitude: Float!, longitude: Float!, techs: [String!]!): [Dev!]!
  }
`;

const resolvers = {
  Mutation: {
    createDev: (obj, { input }, { reqId }) => devsServices.createDev(input, { reqId }),
    updateDev: (obj, { input }) => devsServices.updateDev(input),
    removeDev: (obj, { input }) => devsServices.removeDev(input),
  },
  Query: {
    getDevs: () => devsServices.getAllDevs(),
    getDev: (obj, { id }, { reqId }) => devsServices.getDev({ id }, { reqId }),
    getDevByGithubUsername: (obj, { githubUsername }, { reqId }) =>
      devsServices.getDevByGithubUsername({ githubUsername }, { reqId }),
    filterNearDevsByTechs: (obj, { latitude, longitude, techs }) =>
      devsServices.filterNearDevsByTechs({ latitude, longitude, techs }),
  },
  Coordinates: { latitude: ({ y }) => y, longitude: ({ x }) => x },
};

module.exports = { typeDefs, resolvers };
