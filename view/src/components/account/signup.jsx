import React, { Component } from 'react';

class AuthForm extends Component {
  render() { 
    return (
      <div>
        <form method="POST" id="loginForm">
          <div className="input-area">
            <input type="email" placeholder="your email" className="form-input" id="loginEmail" required />
          </div>
          <div className="input-area">
            <input type="password" placeholder="your password" className="form-input" id="loginPassword" required />
          </div>

          <div>
            <button type="submit" className="btn btn-success btn-block" id="loginBtn">
              <span className="hidden spinner">
                <i className="fa fa-spin fa-spinner fa-lg fa-fw"></i>
              </span>
              <span className="btnText">Welcome</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AuthForm;