import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      favoritesSongs: [],
      checked: new Map(), /* Source: https://medium.com/@wlodarczyk_j/handling-multiple-checkboxes-in-react-js-337863fd284e */
    };
  }

  componentDidMount() {
    this.checkFavorites();
  }

  checkFavorites = async () => {
    this.setState({ isLoaded: false });
    const favorites = await getFavoriteSongs();
    this.setState({ isLoaded: true, favoritesSongs: [...favorites] });
  }

  handleChange = async ({ target }) => {
    const { musics } = this.props;
    const song = musics.find((music) => music.trackId === Number(target.id));
    this.setState({ isLoaded: false });
    await addSong(song);
    this.setState({ isLoaded: true });
    const { name, checked } = target;
    this.setState((prevState) => ({ checked: prevState.checked.set(name, !checked) }));
  }

  render() {
    const { musics } = this.props;
    const { isLoaded, checked, favoritesSongs } = this.state;
    return (
      <ul>
        {!isLoaded && <Loading />}
        {musics.map((music) => (
          music.kind === 'song'
          && (
            <li key={ music.trackName }>
              {music.trackName}
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
                  name={ music.trackId }
                  className="checkbox"
                  onChange={ this.handleChange }
                  checked={ favoritesSongs
                    .some((song) => song.trackId === music.trackId)
                    ? true : checked.get(music.trackId) }
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
};

export default MusicCard;
