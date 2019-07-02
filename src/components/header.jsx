import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  white: {
    color: 'white',
    fontSize: '1.5rem'
  }
};

function Header() {
  const isAuthenticated = false;

  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand text-monospace font-weight-bold display-4">
        DMS
      </h1>
      <ul className="nav justify-content-end">
        {!isAuthenticated && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <span className="text-monospace" style={styles.white}>
                LOGIN / SIGNUP
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
