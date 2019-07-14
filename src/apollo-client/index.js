import ApolloClient from 'apollo-boost';
import { getFromStorage } from '../util';

const client = new ApolloClient({
  uri: process.env.API_URL,
  request: operation => {
    const token = getFromStorage('dms-apolap-token') || '';
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

export default client;
