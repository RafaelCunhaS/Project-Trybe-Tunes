import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

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
    const { musics } = this.props;
    const { isLoaded, favoriteSongs } = this.state;
    if (!isLoaded) return <Loading />;
    return (
      <ul>
        {musics.map((music) => (
          music.kind === 'song'
          && (
            <li key={ music.trackName }>
              <p>{music.trackName}</p>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ music.trackId }>
                <input
                  type="checkbox"
                  id={ music.trackId }
                  onChange={ this.handleChange }
                  checked={ favoriteSongs.some((song) => song.trackId === music.trackId) }
                  data-testid={ `checkbox-music-${music.trackId}` }
                />
                Favorita
              </label>
            </li>)
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: propTypes.arrayOf(propTypes.any).isRequired,
  showFavorites: propTypes.func,
};

MusicCard.defaultProps = {
  showFavorites: () => {},
};

export default MusicCard;
