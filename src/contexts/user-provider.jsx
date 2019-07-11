import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import UserContext from './user-context';
import { GET_USER_DETAILS, GET_MY_DOCUMENTS, GET_ALL_USERS } from '../queries';
import { transformToken } from '../util';

const reducer = (staleState, newState) => {
  return { ...staleState, ...newState };
};

const UserProvider = ({ children }) => {
  const initialAuthStatus = !!localStorage.getItem('token');
  const tokenDetails =
    initialAuthStatus && transformToken(localStorage.getItem('token'));

  const [
    { user, isAuthenticated, myDocuments, allUsers },
    setState
  ] = useReducer(reducer, {
    user: null,
    isAuthenticated: initialAuthStatus,
    myDocuments: [],
    allUsers: []
  });

  const { data: userDetails } = useQuery(GET_USER_DETAILS, {
    variables: { id: tokenDetails.id },
    skip: !isAuthenticated
  });

  const { data: myDocumentsData } = useQuery(GET_MY_DOCUMENTS, {
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
    if (myDocumentsData && myDocumentsData.getMyDocuments) {
      setState({ myDocuments: myDocumentsData.getMyDocuments });
    }
  }, [myDocumentsData]);

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
        myDocuments,
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
