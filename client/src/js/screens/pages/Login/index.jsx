import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { isValidEmail } from '../../../helpers';

import logo from './../../../../assets/img/logo.png';

/**
 * Login Component
 */
class Login extends Component {
  /**
   * Creates an instance of SignIn.
   * @param {any} props component props
   * @memberof SignIn
   */
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      email: '',
      password: ''
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }
  /**
   * Validate the form data
   *
   * @memberof SignIn
   * @return {null} null
   */
  dataIsValid() {
    return isValidEmail(this.state.email) && this.state.password;
  }

  /**
   * Handle user sign in
   *
   * @memberof SignIn
   * @return {null} null
   */
  async handleSignIn() {
    try {
      await this.props.signIn({
        email: this.state.email,
        password: this.state.password
      });

      this.props.router.push('/');
    } catch (errors) {
      const error = errors.response;

      if (error.status === 422) {
        this.setState({
          error: error.data.data.errors
        });
      } else {
        this.setState({
          error: 'Something went wrong on the server. Please try again later.'
        });
      }
    }
  }

  /**
   * Render component jsx
   * @returns {object} object
   */
  render() {
    let errorBag = (
      <small />
    );
    if (this.state.error) {
      errorBag = (
        <small
          id="loginErrorMessage"
          className="mb-3"
          style={{
            color: '#E27C3E',
            fontWeight: '700'
          }}
        >
          {this.state.error}
        </small>
      );
    }

    return (
      <div>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xs-12">
              <h1 className="text-center">
                <img src={logo} className="mb-5" style={{ width: '100px', height: '100px' }} alt="" />
              </h1>
              <div className="card wow fadeInUp">
                <div className="card-body">
                  <div className="text-center row justify-content-center">
                    <div className="col-10">
                      <h3 className="text-center mb-3 mt-3">Login</h3>
                      {errorBag}
                      <br />
                      <br />
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="staticEmail"
                          name="email"
                          placeholder="email@example.com"
                          value={this.state.email}
                          onChange={(event) => {
                            this.setState({ email: event.target.value });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={(event) => {
                            this.setState({ password: event.target.value });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          className="btn mb-3 btn-primary form-control"
                          onClick={() => { this.handleSignIn(); }}
                          type="button"
                          disabled={!this.dataIsValid()}
                        >Login
                        </button>
                        <span className="mt-5 h6 mr-3">No account yet ? <Link style={{ textDecoration: 'none' }} to="/auth/register">Register</Link></span>
                        <span className="mt-5 ml-2 h6"><a>Forgot your password?</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func,
  router: PropTypes.objectOf(PropTypes.any).isRequired
};

Login.defaultProps = {
  signIn() { }
};

export default Login;
