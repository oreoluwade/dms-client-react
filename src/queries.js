import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      token
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      username
      email
      id
      role
      createdAt
      updatedAt
      documents {
        title
        content
        access
        owner {
          username
          firstname
        }
      }
    }
  }
`;

export const GET_MY_DOCUMENTS = gql`
  query {
    getMyDocuments {
      id
      title
      createdAt
      updatedAt
      content
      access
    }
  }
`;
