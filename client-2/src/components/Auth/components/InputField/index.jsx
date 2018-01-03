import React from 'react';
import PropTypes from 'prop-types';
import ValidationSpanError from '../ValidationSpanError';

const InputField = ({
  input,
  placeholder,
  type,
  meta: { touched, error }
}) => (
  <div>
    <input {...input} className="form-control" placeholder={placeholder} type={type} />
    {touched &&
      ((error && <ValidationSpanError error={error} />))}
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired
};

export default InputField;
