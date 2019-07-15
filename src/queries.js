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
      id
      username
      email
      firstname
      lastname
      avatar
      role
      createdAt
      updatedAt
      documents {
        id
      }
    }
  }
`;

export const GET_ALL_DOCUMENTS = gql`
  query {
    getAllDocuments {
      id
      title
      createdAt
      updatedAt
      content
      access
      owner {
        id
        role
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
  mutation CREATE_DOCUMENT(
    $title: String!
    $content: String!
    $access: String
  ) {
    createDocument(title: $title, content: $content, access: $access) {
      title
      content
      access
      id
      createdAt
      updatedAt
      owner {
        id
      }
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
  mutation UPDATE_DOCUMENT(
    $id: ID!
    $title: String
    $content: String
    $access: String
  ) {
    updateDocument(id: $id, title: $title, content: $content, access: $access) {
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

export const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE(
    $id: ID!
    $username: String
    $email: String
    $password: String
    $firstname: String
    $lastname: String
    $avatar: String
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
      avatar: $avatar
    ) {
      id
      email
      username
      firstname
      lastname
      avatar
      updatedAt
    }
  }
`;
