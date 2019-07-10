import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts';

const styles = {
  white: {
    color: 'white',
    fontSize: '1.5rem'
  }
};

function Header() {
  const { isAuthenticated, resetApp, user } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    resetApp();
    history.push('/');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand font-weight-bold display-4">DMS</h1>
      <ul className="nav justify-content-center" style={styles.white}>
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
        {user && user.role === 'ADMIN' && (
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

export default Header;
