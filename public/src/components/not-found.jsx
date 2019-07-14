import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const styles = {
  wrapper: {
    width: '50%',
    margin: 'auto',
    top: '50%'
  }
};

function NotFound({ location }) {
  const notFoundText = `${location.pathname} is not a valid route`;

  return (
    <div className="card text-center" style={styles.wrapper}>
      <div className="card-header text-uppercase text-info">Info</div>
      <div className="card-body">
        <h5 className="card-title font-italic text-danger">{notFoundText}</h5>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NotFound);
