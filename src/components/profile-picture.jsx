import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uploadImage from '../util/upload-image';
import { UserContext } from '../contexts';
import { UPDATE_PROFILE, GET_USER_DETAILS } from '../queries';

const styles = {
  imageWrapper: {
    borderRadius: '10rem'
  },
  noImageSelectedDiv: {
    height: '10rem',
    width: '10rem',
    border: '1px dotted black'
  },
  noImageIcon: {
    color: 'grey',
    height: 200,
    width: 200
  },
  selectButton: {
    height: '3rem',
    borderRadius: '0.2rem',
    width: '6rem',
    backgroundColor: '#367BFE'
  },
  selectText: {
    color: 'white',
    marginBottom: 0
  },
  imageLoaded: {
    borderRadius: '10rem',
    objectFit: 'cover',
    objectPosition: '100% 0'
  }
};

function ProfilePicture() {
  const { user } = useContext(UserContext);

  const [imageHasBeenSelected, setImageHasBeenSelected] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [fileData, setFileData] = useState('');

  const selectImage = event => {
    event.persist();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageHasBeenSelected(true);
        setSelectedImageUrl(reader.result);
        setFileData(event.target.files[0]);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div
      className="d-flex flex-column m-auto align-items-center"
      style={styles.imageWrapper}
    >
      {imageHasBeenSelected || user.avatar ? (
        <img
          src={selectedImageUrl || user.avatar}
          width="200"
          height="200"
          className="mb-3"
          style={styles.imageLoaded}
        />
      ) : (
        <span className="d-flex flex-column justify-content-center align-items-center mb-3">
          <FontAwesomeIcon
            icon="image"
            data-toggle="tooltip"
            title="No image yet"
            style={styles.noImageIcon}
          />
          <span>No Image Yet</span>
        </span>
      )}
      <div className="d-flex flex-row justify-content-between align-items-center">
        <label
          htmlFor="fileElem"
          className="d-flex justify-content-center align-items-center"
          style={styles.selectButton}
        >
          <p style={styles.selectText}>BROWSE</p>
        </label>
        {imageHasBeenSelected && (
          <Mutation
            mutation={UPDATE_PROFILE}
            onCompleted={() => {
              Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Profile picture updated!',
                showConfirmButton: false,
                timer: 1500,
                toast: true
              });
              setImageHasBeenSelected(false);
            }}
            refetchQueries={() => [
              {
                query: GET_USER_DETAILS,
                variables: {
                  id: user.id
                }
              }
            ]}
            onError={error => {
              console.log('profile picture error', error.message);
            }}
          >
            {mutate => (
              <FontAwesomeIcon
                icon="upload"
                color="#367BFE"
                className="fa-2x ml-5"
                data-toggle="tooltip"
                title="Upload"
                onClick={async () => {
                  const avatar = await uploadImage({
                    fileData,
                    tags: ['profile', 'picture', 'image'],
                    publicId: `${user.username}-profile`
                  });
                  if (avatar.startsWith('https')) {
                    mutate({
                      variables: {
                        id: user.id,
                        avatar
                      }
                    });
                  }
                }}
              />
            )}
          </Mutation>
        )}
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={selectImage}
        />
      </div>
    </div>
  );
}

export default ProfilePicture;
