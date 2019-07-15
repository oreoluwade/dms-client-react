import React, { useContext, useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import Swal from 'sweetalert2';
import CustomInput from './custom-input';
import { UserContext } from '../contexts';
import { UPDATE_PROFILE, GET_USER_DETAILS } from '../queries';

const styles = {
  wrapper: {
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    borderColor: 'black',
    height: '3.5rem'
  }
};

function Profile() {
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    setValues(user);
  }, [user]);

  const startEditing = e => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleInputChange = e => {
    e.preventDefault();
    e.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className="container bg-light mt-5" style={styles.wrapper}>
      {user && values && (
        <div className="row mt-5 w-75">
          <div className="col-sm-6 d-flex flex-column align-items-center">
            <CustomInput
              className="mt-4"
              placeholder="Username"
              label="Username"
              description="Username"
              name="username"
              style={styles.input}
              value={values.username}
              disabled={!editMode}
              onChange={handleInputChange}
            />
            <CustomInput
              className="mt-4"
              placeholder="Email"
              label="Email"
              description="Email"
              type="email"
              name="email"
              style={styles.input}
              value={values.email}
              disabled={!editMode}
              onChange={handleInputChange}
            />
            <CustomInput
              className="mt-4"
              placeholder="Firstname"
              label="Firstname"
              description="Firstname"
              name="firstname"
              style={styles.input}
              value={values.firstname}
              disabled={!editMode}
              onChange={handleInputChange}
            />
            <CustomInput
              className="mt-4"
              placeholder="Lastname"
              label="Lastname"
              name="lastname"
              description="Lastname"
              style={styles.input}
              value={values.lastname}
              disabled={!editMode}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-sm-6 d-flex justify-content-center">
            <h1>Avatar</h1>
          </div>
        </div>
      )}
      <Mutation
        mutation={UPDATE_PROFILE}
        onCompleted={() => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Profile Update Successful!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          });
          setEditMode(false);
        }}
        onError={error => {
          console.log('error message', error.message);
        }}
        refetchQueries={() => [
          {
            query: GET_USER_DETAILS,
            variables: {
              id: user.id
            }
          }
        ]}
      >
        {mutate => (
          <button
            type="button"
            title={editMode ? 'Click to save' : 'Click to change details'}
            className="btn btn-primary btn-lg mt-5 w-25"
            onClick={
              !editMode
                ? startEditing
                : async e => {
                    e.preventDefault();
                    mutate({
                      variables: values,
                      skip: !user || !user.id || !editMode
                    });
                  }
            }
          >
            {editMode ? 'SAVE' : 'START EDITING'}
          </button>
        )}
      </Mutation>
    </div>
  );
}

export default Profile;