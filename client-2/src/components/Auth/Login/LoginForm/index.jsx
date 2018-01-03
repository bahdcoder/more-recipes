import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import logUserIn from '../../../../services/login';
import validateLogin from '../../validators/login';
import InputField from './../../components/InputField';
import ValidationSpanError from '../../components/ValidationSpanError';

const LoginForm = ({
  valid,
  submitting,
  handleSubmit,
  error
}) => ((
  <form onSubmit={handleSubmit(logUserIn)}>
    <div className="justify-content-center">
      <ValidationSpanError error={error} />
    </div>
    <br />
    <div className="form-group row">
      <div className="col-sm-12">
        <Field
          className="form-control"
          placeholder="email@example.com"
          name="email"
          component={InputField}
        />
      </div>
    </div>
    <div className="form-group row">
      <div className="col-sm-12">
        <Field
          className="form-control"
          placeholder="Password"
          name="password"
          type="password"
          component={InputField}
        />
      </div>
    </div>
    <div className="form-group row justify-content-center">
      <div className="text-center">
        <br />
        <button
          className="btn btn-primary btn-lg"
          type="submit"
          disabled={!valid || submitting}
        >
        Login
        </button>
      </div>
    </div>
  </form>
));

LoginForm.propTypes = {
  error: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const ReduxLoginForm = reduxForm({
  form: 'loginForm', validate: validateLogin
})(LoginForm);

export default ReduxLoginForm;
