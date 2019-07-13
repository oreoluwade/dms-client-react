import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  linkStyle: {
    textDecoration: 'none'
  },
  iconStyle: {
    position: 'absolute',
    height: '4rem',
    width: '4rem',
    right: '3rem',
    bottom: '3rem',
    color: 'green'
  }
};

const unallowedLocations = ['/login', '/', '/signup', '/create-document'];

function CreateDocumentButton({ location }) {
  const iconIsVisible = !unallowedLocations.includes(location.pathname);

  return iconIsVisible ? (
    <Link to="/create-document" style={styles.linkStyle}>
      <FontAwesomeIcon
        icon="pencil-alt"
        className="fa-2x"
        style={styles.iconStyle}
        data-toggle="tooltip"
        title="CREATE HABIT"
      />
    </Link>
  ) : null;
}

CreateDocumentButton.propTypes = {
  location: PropTypes.object
};

export default withRouter(CreateDocumentButton);
