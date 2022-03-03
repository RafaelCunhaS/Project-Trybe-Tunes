import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './Search.css';

const MAGIC_NUMBER = 4;

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

  getKey = (event) => {
    if (event.key === 'Enter' && event.target.value.length >= 2) this.handleButton();
  }

  handleButton = async () => {
    const { searchInput } = this.state;
    this.setState({ isLoaded: false });
    this.setState({ albumsArray: [''] });
    this.setState({ artist: searchInput });
    const albums = await searchAlbumsAPI(searchInput);
    const filtered = albums.filter(({ collectionPrice }) => collectionPrice);
    this.setState({ albumsArray: [...filtered] });
    this.setState({ searchInput: '' });
    this.setState({ isLoaded: true });
  };

  render() {
    const { searchInput, enableButton, isLoaded, artist, albumsArray } = this.state;
    return (
      <section className="search-page">
        <Header />
        <div className="search-inputs">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            className="icon-placeholder"
            value={ searchInput }
            onChange={ this.handleChange }
            onKeyDown={ this.getKey }
            placeholder=" &#xF002;   Artist/Band name"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ enableButton }
            onClick={ this.handleButton }
          >
            Search
          </button>
        </div>
        {albumsArray.length === 0 ? <p id="p1">No albums found</p> : (
          <p id="p2">
            Albums found of
            {` ${artist}`}
            :
          </p>)}
        {!isLoaded ? <Loading /> : (
          <ul className="albums-list">
            {albumsArray.map(
              ({
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <li className="list-items" key={ collectionId }>
                  <img
                    src={ artworkUrl100.replace('100x100', '200x200') }
                    alt={ collectionName }
                  />
                  <Link
                    to={ `/album/${collectionId}` }
                    state={ { from: 'occupation' } }
                    data-testid={ `link-to-album-${collectionId}` }
                    className="link-album"
                  >
                    <h3>{collectionName}</h3>
                    <p>{`${collectionPrice} $`}</p>
                    <p>{releaseDate.slice(0, MAGIC_NUMBER)}</p>
                    <p>{`${trackCount} tracks`}</p>
                  </Link>
                </li>
              ),
            )}
          </ul>)}
      </section>
    );
  }
}

export default Search;
