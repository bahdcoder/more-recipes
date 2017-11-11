import React, { Component } from 'react';
import { isValidEmail } from '../../../helpers';

export default class SignIn extends Component {
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
   * @returns 
   * @memberof SignIn
   */
  dataIsValid() {
    return isValidEmail(this.state.email) && this.state.password;
  }

  /**
   * Handle user sign in
   * 
   * @memberof SignIn
   */
  async handleSignIn() {
    try {
      const user = await this.props.data.signIn({ 
        email: this.state.email, 
        password: this.state.password
      });

      $('#loginModal').modal('toggle');
    } catch (error) {
      let error = error.response;

      if (error.status === 422) {
        this.setState({
          error: error.data.data.message
        });
      } else {
        this.setState({
          error: 'Something went wrong on the server. Please try again later.'
        });
      }
    }
  }
  render() {
    let errorBag = (
      <small></small>
    );
    if (this.state.error) {
      errorBag = <small className="mb-3" style={{
        color: '#E27C3E',
        fontWeight: '700'
      }}>{this.state.error}</small>;
    }

    return (
      <div className="modal fade" id="loginModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document" style={{paddingTop: 130}}>
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="row justify-content-center">
                <div className="col-10">
                    <h3 className="text-center mb-3 mt-3">Login</h3>
                    {errorBag}
                    
                    <div className="form-group">
                      <input type="text" 
                             className="form-control" 
                             id="staticEmail" 
                             placeholder="email@example.com"
                             value={this.state.email}
                             onChange={(event) => {
                               this.setState({ email: event.target.value });
                             }} />                                    
                    </div>  
                    <div className="form-group">
                      <input type="password" 
                             className="form-control" 
                             id="inputPassword" 
                             placeholder="Password"
                             value={this.state.password}
                             onChange={(event) => {
                               this.setState({ password: event.target.value });
                             }}  />                                    
                    </div>
                    <div className="form-group">
                      <button className="btn mb-3 btn-primary form-control" 
                              onClick={(event) => { this.handleSignIn(); }} 
                              type="button"
                              disabled={!this.dataIsValid()}>Login</button>   
                      <span className="mt-5 h6 mr-3"><a role="button" data-toggle="modal" data-target="#registerModal" data-dismiss="modal">No account ? Register</a></span>    
                      <span className="mt-5 ml-2 h6"><a>Forgot your password?</a></span>                                 
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