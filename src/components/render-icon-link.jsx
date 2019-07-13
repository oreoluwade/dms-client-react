import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = {
  openDocLink: {
    textDecoration: 'none'
  }
};

const RenderIconLink = ({
  document,
  iconStyle,
  iconClass,
  icon,
  iconTitleTip
}) => (
  <Link
    to={{
      pathname: `/document/${document.id}`,
      state: document
    }}
    style={styles.openDocLink}
  >
    <FontAwesomeIcon
      icon={icon}
      className={iconClass}
      style={iconStyle}
      data-toggle="tooltip"
      title={iconTitleTip}
    />
  </Link>
);

RenderIconLink.propTypes = {
  document: PropTypes.object.isRequired,
  iconStyle: PropTypes.object,
  iconClass: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconTitleTip: PropTypes.string
};

export default RenderIconLink;
