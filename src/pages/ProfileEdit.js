import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      name: '',
      email: '',
      image: '',
      description: '',
      isButtonDisabled: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    await this.userInfo();
    this.validateButton();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
    this.validateButton();
  };

  validateButton = () => {
    const { name, email, image, description } = this.state;
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]+)[^0-9]$/i);
    if (name && email && image && description && validEmail) {
      this.setState({ isButtonDisabled: false });
    } else this.setState({ isButtonDisabled: true });
  }

  userInfo = async () => {
    this.setState({ isLoaded: false });
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ isLoaded: true, name, email, image, description });
  };

  saveUser = async () => {
    this.setState({ isLoaded: false });
    const { name, email, image, description } = this.state;
    const obj = { name, email, image, description };
    await updateUser(obj);
    this.setState({ isLoaded: true, redirect: true });
  };

  render() {
    const {
      isLoaded,
      name,
      email,
      image,
      description,
      isButtonDisabled,
      redirect,
    } = this.state;
    if (redirect) return <Redirect to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {!isLoaded ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                type="text"
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="usuario@exemplo.com"
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="description">
              Descrição
              <textarea
                type="text"
                id="description"
                value={ description }
                onChange={ this.handleChange }
                name="description"
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="image">
              Alterar Imagem
              <input
                type="text"
                id="image"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
            </label>
            <button
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.saveUser }
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
