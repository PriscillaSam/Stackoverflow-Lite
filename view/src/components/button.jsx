import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  btnClassName, btnText, onLoading, disabled,
}) => (
  <button type="submit" className={btnClassName} disabled={disabled}>
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
  btnText: PropTypes.string.isRequired,
  onLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
