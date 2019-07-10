import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import UserContext from './user-context';
import { GET_USER_DETAILS, GET_MY_DOCUMENTS } from '../queries';
import transformToken from '../util/transformToken';

const reducer = (staleState, newState) => {
  return { ...staleState, ...newState };
};

const checkAuthStatus = () => !!localStorage.getItem('token');

const tokenDetails =
  checkAuthStatus && transformToken(localStorage.getItem('token'));

const UserProvider = ({ children }) => {
  const [{ user, isAuthenticated, myDocuments }, setState] = useReducer(
    reducer,
    {
      user: null,
      isAuthenticated: checkAuthStatus(),
      myDocuments: []
    }
  );

  const { data: myDocumentsData } = useQuery(GET_MY_DOCUMENTS, {
    skip: !user
  });

  useEffect(() => {
    if (myDocumentsData && myDocumentsData.getMyDocuments) {
      setState({ myDocuments: myDocumentsData.getMyDocuments });
    }
  }, [myDocumentsData]);

  const resetApp = () => {
    setState({ user: null, isAuthenticated: false, myDocuments: [] });
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
        <UserContext.Provider
          value={{ user, resetApp, isAuthenticated, myDocuments }}
        >
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
