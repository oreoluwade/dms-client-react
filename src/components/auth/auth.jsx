import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './login';
import Signup from './signup';

const styles = {
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    minWidth: '40rem'
  }
};

function Auth({ location }) {
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card border-primary my-auto" style={styles.authContainer}>
        <div className="card-header text-monospace font-weight-bold">
          {isLoginPage ? 'Login' : 'Signup'}
        </div>
        <div className="card-body text-primary">
          {isLoginPage ? <Login /> : <Signup />}
        </div>
        <Link to={isLoginPage ? '/signup' : '/login'}>
          <span>
            {isLoginPage
              ? 'Not yet registered, Signup'
              : 'Already registered? Login'}
          </span>
        </Link>
      </div>
    </div>
  );
}

Auth.propTypes = {
  location: PropTypes.object
};

export default Auth;
