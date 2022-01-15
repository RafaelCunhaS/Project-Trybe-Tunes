import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <ul>
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
