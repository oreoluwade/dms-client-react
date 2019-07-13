import React from 'react';

const styles = {
  wrapper: {
    height: '70vh'
  }
};

function Profile() {
  return (
    <div
      className="container d-flex bg-light mt-5 mb-5 justify-content-center"
      style={styles.wrapper}
    >
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">Profile</h5>
        </div>
      </div>
    </div>
  );
}

export default Profile;
