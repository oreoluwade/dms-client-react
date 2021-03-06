import React, { useContext, useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import Swal from 'sweetalert2';
import CustomInput from './custom-input';
import { UserContext } from '../contexts';
import { UPDATE_PROFILE, GET_USER_DETAILS } from '../queries';
import ProfilePicture from './profile-picture';
import Loader from './loader';

const styles = {
  wrapper: {
    marginTop: '10rem'
  },
  input: {
    borderColor: 'black',
    height: '3rem',
    fontSize: '1.5rem'
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

  return user && values ? (
    <div className="container" style={styles.wrapper}>
      <div className="row mt-5">
        <div className="col-sm-8 d-flex flex-column align-items-center bg-light">
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
            value={values.firstname || ''}
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
            value={values.lastname || ''}
            disabled={!editMode}
            onChange={handleInputChange}
          />
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
                className="btn btn-primary btn-lg mt-3 mb-3"
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
        <ProfilePicture />
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Profile;
