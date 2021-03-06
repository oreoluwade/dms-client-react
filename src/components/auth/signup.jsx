import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { REGISTER } from '../../queries';
import { addToStorage } from '../../util';

const styles = {
  divider: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    border: 0,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

function Signup({ history }) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      mutation={REGISTER}
      onCompleted={data => {
        addToStorage({ token: data.registerUser.token });
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Signup successful',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        history.push('/documents');
      }}
      onError={error => {
        console.log('ERROR', error.message);
      }}
    >
      {(mutate, { loading }) => (
        <form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            await mutate({
              variables: values
            });
          }}
        >
          <div className="form-group">
            <label htmlFor="username" className="text-monospace text-sm-left">
              Username
            </label>
            <input
              type="text"
              className="form-control text-monospace"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              name="username"
              value={values.username}
              onChange={handleInputChange}
            />
          </div>
          <hr style={styles.divider} />
          <div className="form-group">
            <label htmlFor="email" className="text-monospace">
              Email address
            </label>
            <input
              type="email"
              className="form-control text-monospace"
              id="email"
              aria-describedby="usernameHelp"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="password" className="text-monospace">
              Password
            </label>
            <input
              type="password"
              className="form-control text-monospace"
              id="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="confirmPassword" className="text-monospace">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control text-monospace"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
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

Signup.propTypes = {
  history: PropTypes.object
};

export default withRouter(Signup);
