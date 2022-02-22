import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import './Login.css';
import logo from '../logo.png';

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
      <div className="login-page" data-testid="page-login">
        <img className="login-logo" src={ logo } alt="Logo" />
        <div id="rectangle">
          <input
            id="login-input"
            type="text"
            name="loginName"
            value={ loginName }
            onChange={ this.handleChange }
            placeholder="Nome"
            data-testid="login-name-input"
          />
          <button
            id="login-btn"
            type="button"
            data-testid="login-submit-button"
            onClick={ this.loginButton }
            disabled={ enableButton }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}
