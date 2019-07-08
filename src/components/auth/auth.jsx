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
    minWidth: '40rem'
  },
  title: {
    textAlign: 'center'
  },
  link: {
    textAlign: 'center'
  },
  body: {
    backgroundColor: '#AFAFAF'
  }
};

function Auth({ location }) {
  const isLoginPage = location.pathname === '/login';

  return (
    <div
      className="d-flex justify-content-center mt-5 mb-2"
      style={styles.body}
    >
      <div className="card border-primary my-auto" style={styles.authContainer}>
        <div
          className="card-header text-monospace font-weight-bold"
          style={styles.title}
        >
          {isLoginPage ? 'LOGIN' : 'REGISTER'}
        </div>
        <div className="card-body text-primary">
          {isLoginPage ? <Login /> : <Signup />}
        </div>
        <Link to={isLoginPage ? '/signup' : '/login'} style={styles.link}>
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
