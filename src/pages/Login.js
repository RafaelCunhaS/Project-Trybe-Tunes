import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

const MIN_NAME_LENGTH = 3;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      loginName: '',
      enableButton: true,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (value.length >= MIN_NAME_LENGTH) {
      this.setState({ enableButton: false });
    } else {
      this.setState({ enableButton: true });
    }
  }

  loginButton = () => {
    const { loginName } = this.state;
    this.setState({ isLoaded: false });
    createUser({ name: loginName })
      .then(() => this.setState({ isLoaded: true, redirect: true }));
  }

  render() {
    const { isLoaded, loginName, enableButton, redirect } = this.state;
    if (!isLoaded) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <label htmlFor="loginName">
          Login:
          <input
            type="text"
            name="loginName"
            value={ loginName }
            onChange={ this.handleChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.loginButton }
          disabled={ enableButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}
