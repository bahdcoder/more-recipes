import { Link } from 'react-router';
import React, { Component } from 'react';
import { isValidEmail } from '../../../helpers';

import logo from './../../../../assets/img/logo.png';


export default class Register extends Component {
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
      password: '',
      confirmPassword: '',
      name: '',
      errors: [],
      canSubmit: false
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.validateData = this.validateData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


    /**
   * Handle input change events
   * 
   * @param {any} event change event
   * @memberof CreateRecipe
   */
  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    await this.validateData();
  }

  /**
   * Validate the form data
   * 
   * @returns 
   * @memberof SignIn
   */
  async validateData() {
    let errors = [];
    if (!isValidEmail(this.state.email)) {
      errors.push('The email must be a valid one.');
    }
    if (this.state.password.length > 6) {
      if (this.state.password !== this.state.confirmPassword) {
        errors.push('The passwords do not match.');
      }
    } else {
      errors.push('The password must be longer than six characters.');
    }
    if (this.state.name < 1) {
      errors.push('The first name is required.');
    }

    this.setState({ errors }, () => {
      return Promise.resolve();
    });
  }

  /**
   * Handle user sign in
   * 
   * @memberof SignIn
   */
  async handleSignUp() {
    await this.validateData();
    if (this.state.errors.length > 0) {
      return;
    }
    
    try {

      const response = await this.props.signUp({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });

      this.props.router.push('/');

    } catch (error) {
      let error = error.response;

      if (error.status === 422) {
        this.setState({ errors: error.data.data.errors });
      } else {
        this.setState({
          error: 'Something went wrong on the server. Please try again later.'
        });
      }
    }
  }
  render() {
    let errorBag = this.state.errors.map((error, index) => {
      return (
        <span key={index}>
          <small className="mb-3" style={{
            color: '#E27C3E',
            fontWeight: '700'
          }}>{error}</small>
          <br />
        </span>
      );
    });

    return (
      <div>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-8 col-xs-12">
                        <h1 className="text-center">
                          <img src={logo} className="mb-5" style={{ width: '100px', height: '100px' }} />
                        </h1>
                        <div className="card wow fadeInUp">
                            <div className="card-body">
                            <div className="text-center row justify-content-center">
                                <div className="col-10">
                                    <h3 className="text-center mb-3 mt-3"> Register </h3>
                                    {errorBag}
                                    <br/>
                                    <br/>
                                    <div className="form-group">
                                        <input type="text" 
                                              className="form-control" 
                                              placeholder="Name"
                                              name="name"
                                              value={this.state.name}
                                              onChange={(event) => {
                                                this.handleInputChange(event);
                                              }}
                                              onBlur={this.validateData} />
                                    </div>
                                    <div className="form-group">
                                       <input type="text" 
                                              className="form-control" 
                                              placeholder="email@example.com"
                                              name="email"
                                              value={this.state.email}
                                              onChange={(event) => {
                                                this.setState({ email: event.target.value });
                                              }}
                                              onBlur={this.validateData} />
                                    </div>
                                    <div className="form-group">
                                      <input type="password" 
                                              className="form-control" 
                                              id="inputPassword" 
                                              placeholder="Password"
                                              name="password"
                                              value={this.state.password}
                                              onChange={(event) => {
                                                this.setState({ password: event.target.value });
                                              }}
                                              onBlur={this.validateData} 
                                              />                                    
                                    </div>
                                    <div className="form-group">
                                      <input type="password" 
                                              className="form-control"  
                                              placeholder="Confirm password"
                                              name="confirmPassword"
                                              value={this.state.confirmPassword}
                                              onChange={(event) => {
                                                this.handleInputChange(event);
                                              }}  
                                              onBlur={this.validateData}/>                                    
                                    </div>
                                    <div className="form-group">
                                      <button className="btn mb-3 btn-primary btn-lg" 
                                              onClick={this.handleSignUp} 
                                              type="button"
                                              > Register </button> 
                                              <br />    
                                      <span className="mt-5 ml-2 h6">
                                      Have an account already ?  
                                        <Link to="/auth/login">    Login Here</Link>
                                      </span>                                 
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