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
      owner {
        id
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      username
      email
      id
      role
      createdAt
      documents {
        id
      }
    }
  }
`;

export const CREATE_DOCUMENT = gql`
  mutation CREATE_DOCUMENT($title: String!, $content: String!) {
    createDocument(title: $title, content: $content) {
      title
      content
      id
    }
  }
`;

export const GET_ONE_DOCUMENT = gql`
  query GET_ONE_DOCUMENT($id: ID!) {
    getDocument(id: $id) {
      id
      title
      createdAt
      updatedAt
      content
      access
      owner {
        id
      }
    }
  }
`;

export const UPDATE_DOCUMENT = gql`
  mutation UPDATE_DOCUMENT($id: ID!, $title: String, $content: String) {
    updateDocument(id: $id, title: $title, content: $content) {
      id
      title
      createdAt
      updatedAt
      content
      access
      owner {
        id
      }
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DELETE_DOCUMENT($id: ID!) {
    deleteDocument(id: $id) {
      message
    }
  }
`;
