import graphql from 'graphql-tag';
import { Query, Mutate } from './client';

const GET_DEVS = graphql`
  query getDevs {
    getDevs {
      id
      githubUsername
      name
      bio
      avatarUrl
      techs
    }
  }
`;

const CREATE_DEV = graphql`
  mutation createDev($githubUsername: String!, $techs: [String!]!, $latitude: Float!, $longitude: Float!) {
    createDev(input: { githubUsername: $githubUsername, techs: $techs, latitude: $latitude, longitude: $longitude }) {
      id
      githubUsername
      name
      bio
      avatarUrl
      techs
    }
  }
`;

const REMOVE_DEV = graphql`
  mutation removeDev($id: Int!) {
    removeDev(input: { id: $id }) {
      id
    }
  }
`;

const getDevs = () => Query(GET_DEVS).then(resp => resp.data.getDevs);

const createDev = ({ githubUsername, techs, latitude, longitude }) =>
  Mutate(CREATE_DEV, { githubUsername, techs, latitude, longitude }).then(resp => resp.data.createDev);

const removeDev = id => Mutate(REMOVE_DEV, { id }).then(resp => resp.data.removeDev);

export default { createDev, getDevs, removeDev };
