import React from 'react';
import PropTypes from 'prop-types';

const AlertBox = ({ detail, style }) => (
  <div className={`${style} alert fadeIn`}>
    <p className="text-center text-white alertText">{detail}</p>
  </div>
);

AlertBox.propTypes = {
  detail: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

export default AlertBox;
