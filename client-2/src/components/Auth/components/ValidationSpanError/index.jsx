import React from 'react';
import PropTypes from 'prop-types';

const ValidationSpanError = ({ error }) => (
  <span className="validation-span-error">
    <small style={{
      color: '#E27C3E'
    }}
    >
      {error}
    </small>
  </span>
);

ValidationSpanError.propTypes = {
  error: PropTypes.string.isRequired
};

export default ValidationSpanError;
