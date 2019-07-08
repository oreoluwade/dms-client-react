import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import UserContext from './user-context';
import { GET_USER_DETAILS } from '../queries';
import transformToken from '../util/transformToken';

const reducer = (staleState, newState) => {
  return { ...staleState, ...newState };
};

const checkAuthStatus = () => !!localStorage.getItem('token');

const tokenDetails =
  checkAuthStatus && transformToken(localStorage.getItem('token'));

const UserProvider = ({ children }) => {
  const [{ user, isAuthenticated }, setState] = useReducer(reducer, {
    user: null,
    isAuthenticated: checkAuthStatus()
  });

  const resetApp = () => {
    setState({ user: null, isAuthenticated: false });
  };

  return (
    <Query
      query={GET_USER_DETAILS}
      variables={{ id: tokenDetails.id }}
      skip={!(tokenDetails && tokenDetails.id)}
      onCompleted={data => {
        setState({ user: data.getUser });
      }}
    >
      {() => (
        <UserContext.Provider value={{ user, resetApp, isAuthenticated }}>
          {children}
        </UserContext.Provider>
      )}
    </Query>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node
};

export default UserProvider;
