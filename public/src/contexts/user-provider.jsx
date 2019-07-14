import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import UserContext from './user-context';
import { GET_USER_DETAILS, GET_ALL_USERS, GET_ALL_DOCUMENTS } from '../queries';
import { transformToken, getFromStorage } from '../util';

const reducer = (staleState, newState) => {
  return { ...staleState, ...newState };
};

const UserProvider = ({ children }) => {
  const initialAuthStatus = !!getFromStorage('dms-apolap-token');
  const tokenDetails =
    initialAuthStatus && transformToken(getFromStorage('dms-apolap-token'));

  const [
    { user, isAuthenticated, allDocuments, allUsers },
    setState
  ] = useReducer(reducer, {
    user: null,
    isAuthenticated: initialAuthStatus,
    allUsers: [],
    allDocuments: []
  });

  const { data: userDetails } = useQuery(GET_USER_DETAILS, {
    variables: { id: tokenDetails.id },
    skip: !isAuthenticated
  });

  const { data: allDocumentsData } = useQuery(GET_ALL_DOCUMENTS, {
    skip: !user
  });

  const { data: allUsersData, error: allUsersError } = useQuery(GET_ALL_USERS, {
    skip: !user || (user && user.role !== 'ADMIN')
  });

  useEffect(() => {
    if (userDetails && userDetails.getUser) {
      setState({ user: userDetails.getUser });
    }
  }, [userDetails]);

  useEffect(() => {
    if (allDocumentsData && allDocumentsData.getAllDocuments) {
      setState({ allDocuments: allDocumentsData.getAllDocuments });
    }
  }, [allDocumentsData]);

  useEffect(() => {
    if (allUsersData && allUsersData.getAllUsers) {
      setState({ allUsers: allUsersData.getAllUsers });
    }
    if (allUsersError) {
      console.log(allUsersError);
    }
  }, [allUsersData, allUsersError]);

  const handleAuthStatusChange = newValue =>
    setState({ isAuthenticated: newValue });

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        allDocuments,
        allUsers,
        handleAuthStatusChange
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node
};

export default UserProvider;
