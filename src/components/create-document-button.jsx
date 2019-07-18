import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  linkStyle: {
    textDecoration: 'none'
  }
};

const unallowedLocations = ['/login', '/', '/signup', '/create-document'];

function CreateDocumentButton({ location }) {
  const iconIsVisible = !unallowedLocations.includes(location.pathname);

  return iconIsVisible ? (
    <Link
      to="/create-document"
      style={styles.linkStyle}
      className="d-flex justify-content-end"
    >
      <FontAwesomeIcon
        icon="pencil-alt"
        className="fa-5x mb-5 mr-3 mt-4"
        color="green"
        data-toggle="tooltip"
        title="CREATE NEW DOCUMENT"
      />
    </Link>
  ) : null;
}

CreateDocumentButton.propTypes = {
  location: PropTypes.object
};

export default withRouter(CreateDocumentButton);
