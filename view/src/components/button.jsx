import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = ({
  btnClassName, btnId, btnText, onLoading,
}) => (
  <button type="submit" className={btnClassName} id={btnId}>
    {onLoading
    && (
      <span className="spinner">
        <i className="fa fa-spin fa-spinner fa-lg fa-fw" />
      </span>
    )}
    <span className="btnText">{btnText}</span>
  </button>
);

Button.propTypes = {
  btnClassName: PropTypes.string.isRequired,
  btnId: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onLoading: PropTypes.bool.isRequired,
};

export default Button;
