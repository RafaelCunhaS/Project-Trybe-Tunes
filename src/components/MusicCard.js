import React, { Component } from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import './MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.checkFavorites();
  }

  checkFavorites = async () => {
    this.setState({ isLoaded: false });
    const favorites = await getFavoriteSongs();
    this.setState({ isLoaded: true, favoriteSongs: [...favorites] });
  }

  handleChange = async ({ target }) => {
    const { musics, showFavorites } = this.props;
    const { id } = target;
    const song = musics.find((music) => music.trackId === Number(id));
    this.setState({ isLoaded: false });
    if (!target.checked) {
      await removeSong(song);
      showFavorites();
    } else {
      await addSong(song);
    }
    this.checkFavorites();
  }

  render() {
    const { musics, showImage } = this.props;
    const { isLoaded, favoriteSongs } = this.state;
    if (!isLoaded) return <Loading />;
    return (
      <ul className="tracks-list">
        {musics.map((music) => (
          music.previewUrl
            && (
              <div>
                <li className="tracks" key={ music.trackName }>
                  {showImage && (
                    <img
                      src={ music.artworkUrl100.replace('100x100', '60x60') }
                      alt={ music.trackId }
                    />)}
                  <p>{music.trackName}</p>
                  <div className="audio-check">
                    <audio
                      className="audio-component"
                      src={ music.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      <code>audio</code>
                    </audio>
                    <label className="hearts" htmlFor={ music.trackId }>
                      <input
                        className="heart-check"
                        type="checkbox"
                        id={ music.trackId }
                        onChange={ this.handleChange }
                        checked={ favoriteSongs.some((song) => song.trackId
                          === music.trackId) }
                        data-testid={ `checkbox-music-${music.trackId}` }
                      />
                      {favoriteSongs.some((song) => song.trackId === music.trackId) ? (
                        <FontAwesomeIcon
                          id="heart-red"
                          icon={ heart }
                        />) : <FontAwesomeIcon icon={ faHeart } />}
                    </label>
                  </div>
                </li>
                <hr />
              </div>)
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: propTypes.arrayOf(propTypes.any).isRequired,
  showFavorites: propTypes.func,
  showImage: propTypes.bool,
};

MusicCard.defaultProps = {
  showFavorites: () => {},
  showImage: false,
};

export default MusicCard;
