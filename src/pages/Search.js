import React, { Component } from 'react';
import Header from '../components/Header';

// const MIN_VALUE = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      enableButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (value.length >= 2) this.setState({ enableButton: false });
    else this.setState({ enableButton: true });
  }

  // handleButton = () => {

  // }

  render() {
    const { searchInput, enableButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          name="searchInput"
          value={ searchInput }
          onChange={ this.handleChange }
          placeholder="Nome do Artista"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ enableButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
