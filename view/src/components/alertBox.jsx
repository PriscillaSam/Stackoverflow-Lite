import React from 'react';
import PropTypes from 'prop-types';

const AlertBox = ({ detail, theme }) => (
  <div className={`bg-${theme} alert fadeIn`}>
    <p className="text-center text-info alertText">{detail}</p>
  </div>
);

AlertBox.propTypes = {
  detail: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default AlertBox;
