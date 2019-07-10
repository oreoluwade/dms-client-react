import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../contexts';

function ProtectedRoute({ component: ComponentToBeRendered, ...routeProps }) {
  const { isAuthenticated } = useContext(UserContext);
  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? (
          <ComponentToBeRendered {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  location: PropTypes.object.isRequired,
  component: PropTypes.object
};

export default ProtectedRoute;
