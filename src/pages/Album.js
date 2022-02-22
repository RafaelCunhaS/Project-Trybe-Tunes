import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      albumArtwork: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.musicsInfo();
  }

  musicsInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      albumArtwork: album[0].artworkUrl100,
      musics: [...album] });
  }

  render() {
    const { artistName, albumName, musics, albumArtwork } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-info">
          <img src={ albumArtwork.replace('100x100', '300x300') } alt={ albumName } />
          <h2 data-testid="album-name">{albumName}</h2>
          <h4 data-testid="artist-name">{artistName}</h4>
        </div>
        <div className="album-tracks"><MusicCard musics={ musics } /></div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
