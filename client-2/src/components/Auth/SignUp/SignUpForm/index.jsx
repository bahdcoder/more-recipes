import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import validateSignUp from '../../validators/signUp';
import signUserUp from '../../../../services/signUp';
import InputField from './../../components/InputField';

const SignUpForm = ({ valid, submitting, handleSubmit }) => ((
  <form onSubmit={handleSubmit(signUserUp)}>
    <div className="form-group row">
      <div className="col-sm-12">
        <Field
          className="form-control"
          placeholder="Full name"
          name="name"
          component={InputField}
        />
      </div>
    </div>
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
    <div className="form-group row">
      <div className="col-sm-12">
        <Field
          className="form-control"
          placeholder="Confirm Password"
          name="confirmPassword"
          component={InputField}
          type="password"
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
        Register
        </button>
      </div>
    </div>
  </form>
));

SignUpForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const ReduxSignUpForm = reduxForm({
  form: 'signUpForm', validate: validateSignUp
})(SignUpForm);

export default ReduxSignUpForm;
