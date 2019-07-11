import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from '../contexts';

const styles = {
  white: {
    color: 'white',
    fontSize: '1.5rem'
  }
};

function Header({ history, location }) {
  const client = useApolloClient();
  const { isAuthenticated, user, handleAuthStatusChange } = useContext(
    UserContext
  );

  const excludedRoutes = ['/login', '/signup'];
  const shouldShowTabs =
    isAuthenticated && !excludedRoutes.includes(location.pathname);

  const logout = () => {
    localStorage.clear();
    handleAuthStatusChange(false);
    client.cache.reset();
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand font-weight-bold display-4">DMS</h1>
      <ul className="nav justify-content-center" style={styles.white}>
        {shouldShowTabs && (
          <Fragment>
            <li className="nav-item active">
              <Link to="/documents" className="nav-link">
                DOCUMENTS <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                PROFILE
              </Link>
            </li>
          </Fragment>
        )}
        {shouldShowTabs && user && user.role === 'ADMIN' && (
          <Fragment>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                MANAGE USERS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/statistics" className="nav-link">
                STATISTICS
              </Link>
            </li>
          </Fragment>
        )}
      </ul>

      <ul className="nav justify-content-end">
        <li className="nav-item">
          {isAuthenticated ? (
            <span
              className="text-monospace"
              style={styles.white}
              onClick={logout}
            >
              LOGOUT
            </span>
          ) : (
            <Link to="/login" className="nav-link">
              <span className="text-monospace" style={styles.white}>
                {'LOGIN / SIGNUP'}
              </span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Header);
