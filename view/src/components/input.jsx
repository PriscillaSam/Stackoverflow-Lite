import React from 'react';
import PropTypes from 'prop-types';

/**
 * Creates an input element
 * @param {object} input element properties
 * @returns {JSX} Jsx element
 */
const Input = ({
  type, placeholder, value, id, name, onChange,
}) => (
  <div className="input-area">
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className="form-input"
      id={id}
      onChange={onChange}
      required
    />
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
