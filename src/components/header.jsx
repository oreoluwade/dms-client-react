import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts';

const styles = {
  white: {
    color: 'white',
    fontSize: '1.5rem'
  }
};

function Header() {
  const { isAuthenticated, resetApp } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    resetApp();
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand text-monospace font-weight-bold display-4">
        DMS
      </h1>
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
