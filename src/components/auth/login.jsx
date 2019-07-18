import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useApolloClient } from 'react-apollo-hooks';
import { Mutation } from 'react-apollo';
import { LOGIN } from '../../queries';
import { UserContext } from '../../contexts';
import { addToStorage } from '../../util';

const styles = {
  divider: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    border: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

function Login({ history }) {
  const client = useApolloClient();
  const { handleAuthStatusChange } = useContext(UserContext);
  const [values, setValues] = useState({
    identifier: '',
    password: ''
  });

  const handleInputChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <Mutation
      mutation={LOGIN}
      onCompleted={data => {
        handleAuthStatusChange(true);
        addToStorage({ token: data.login.token });
        history.push('/documents');
      }}
      onError={error => {
        console.log('ERROR', error.message);
      }}
    >
      {(mutate, { loading }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            await mutate({
              variables: values
            });
          }}
        >
          <div className="form-group">
            <label
              htmlFor="usernameOrEmail"
              className="text-monospace text-sm-left"
            >
              Username or Email
            </label>
            <input
              type="text"
              className="form-control text-monospace"
              id="usernameOrEmail"
              aria-describedby="emailOrUsernameHelp"
              placeholder="Enter Username or Email"
              value={values.identifier}
              name="identifier"
              onChange={handleInputChange}
            />
          </div>
          <hr style={styles.divider} />
          <div className="form-group">
            <label htmlFor="password" className="text-monospace">
              Password
            </label>
            <input
              type="password"
              className="form-control text-monospace"
              id="loginPassword"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={loading}
          >
            Submit
          </button>
        </form>
      )}
    </Mutation>
  );
}

Login.propTypes = {
  history: PropTypes.object
};

export default withRouter(Login);
