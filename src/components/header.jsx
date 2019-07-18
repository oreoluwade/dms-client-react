import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from '../contexts';
import { clearStorage } from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  white: {
    color: 'white',
    fontSize: '1.5rem'
  },
  homeLink: {
    textDecoration: 'none',
    color: 'white'
  },
  headerAvatar: {
    borderRadius: '3rem',
    height: '3rem',
    width: '3rem',
    objectFit: 'cover',
    marginRight: '3.1px'
  },
  popDown: {
    minWidth: '8rem',
    width: '8rem'
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
    handleAuthStatusChange(false);
    clearStorage();
    client.cache.reset();
    history.push('/login');
  };

  return (
    <div
      className="navbar navbar-dark navbar-fixed-top bg-dark navbar-expand-lg"
      role="navigation"
    >
      <Link to="/" style={styles.homeLink}>
        <h1 className="navbar-brand">DMS</h1>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="#navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="navbar-collapse collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="nav navbar-nav">
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
        <ul className="nav navbar-nav">
          <li className="nav-item dropdown">
            {isAuthenticated ? (
              <Fragment>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={styles.homeLink}
                >
                  {user ? (
                    <img
                      src={user && user.avatar}
                      style={styles.headerAvatar}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon="user-circle"
                      className="fa-3x mr-1"
                      color="white"
                    />
                  )}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={styles.popDown}
                >
                  <Link to="/profile" className="dropdown-item mb-4">
                    Profile
                  </Link>
                  <Link to="/documents" className="dropdown-item mb-4">
                    Documents
                  </Link>
                  <span className="dropdown-item" onClick={logout}>
                    Logout
                  </span>
                </div>
              </Fragment>
            ) : (
              <Link to="/login" className="nav-link">
                <span className="text-monospace" style={styles.white}>
                  {'LOGIN / SIGNUP'}
                </span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Header);
