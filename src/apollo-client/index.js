import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.API_URL,
  request: operation => {
    const token = localStorage.getItem('token') || '';
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

export default client;
