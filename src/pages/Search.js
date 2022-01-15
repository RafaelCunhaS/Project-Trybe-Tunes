import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

// const MIN_VALUE = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      searchInput: '',
      artist: '',
      enableButton: true,
      albumsArray: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    if (value.length >= 2) this.setState({ enableButton: false });
    else this.setState({ enableButton: true });
  };

  handleButton = async () => {
    const { searchInput } = this.state;
    this.setState({ isLoaded: false });
    this.setState({ artist: searchInput });
    const albums = await searchAlbumsAPI(searchInput);
    this.setState({ albumsArray: [...albums] });
    this.setState({ searchInput: '' });
    this.setState({ isLoaded: true });
  };

  render() {
    const { searchInput, enableButton, isLoaded, artist, albumsArray } = this.state;
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
          onClick={ this.handleButton }
        >
          Pesquisar
        </button>
        {!isLoaded ? <Loading /> : (
          <p>
            Resultado de álbuns de:
            {` ${artist}`}
          </p>)}
        {albumsArray.length === 0 && <p>Nenhum álbum foi encontrado</p>}
        <ul>
          {albumsArray.map(
            ({
              artistId,
              artistName,
              collectionId,
              collectionName,
              collectionPrice,
              artworkUrl100,
              releaseDate,
              trackCount,
            }) => (
              <li key={ collectionId }>
                <p>{artistId}</p>
                <h4>{artistName}</h4>
                <p>{collectionId}</p>
                <h3>{collectionName}</h3>
                <p>{collectionPrice}</p>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <p>{releaseDate}</p>
                <p>{trackCount}</p>
                <Link
                  to={ `/album/${collectionId}` }
                  state={ { from: 'occupation' } }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  Album
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    );
  }
}

export default Search;
