import graphql from 'graphql-tag';
import { Query } from './client';

const SEARCH_DEVS = graphql`
  query filterNearDevsByTechs($latitude: Float!, $longitude: Float!, $techs: [String!]!) {
    filterNearDevsByTechs(latitude: $latitude, longitude: $longitude, techs: $techs) {
      id
      githubUsername
      name
      bio
      avatarUrl
      techs
      coordinates {
        latitude
        longitude
      }
    }
  }
`;

const searchDevs = ({ latitude, longitude, techs }) =>
  Query(SEARCH_DEVS, { latitude, longitude, techs }).then(resp => resp.data.filterNearDevsByTechs);

export default { searchDevs };
