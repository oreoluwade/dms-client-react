import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RenderIconLink = ({ iconStyle, iconClass, icon, iconTitleTip }) => (
  <FontAwesomeIcon
    icon={icon}
    className={iconClass}
    style={iconStyle}
    data-toggle="tooltip"
    title={iconTitleTip}
  />
);

RenderIconLink.propTypes = {
  iconStyle: PropTypes.object,
  iconClass: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconTitleTip: PropTypes.string
};

export default RenderIconLink;
