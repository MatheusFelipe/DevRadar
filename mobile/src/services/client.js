import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { REACT_APP_API_URI } from 'react-native-dotenv';

let client;

const setUpClient = () => {
  if (!client)
    client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              global.console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            );
          if (networkError) global.console.error(`[Network error]: ${networkError}`);
        }),
        new HttpLink({ uri: REACT_APP_API_URI }),
      ]),
      cache: new InMemoryCache(),
    });
  return client;
};

const Query = (query, variables, fetchPolicy = 'no-cache') => setUpClient().query({ query, variables, fetchPolicy });

const Mutate = (mutation, variables) => setUpClient().mutate({ mutation, variables });

export { Query, Mutate };
