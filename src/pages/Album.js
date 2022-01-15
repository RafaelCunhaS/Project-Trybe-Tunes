import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
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
      musics: [...album] });
  }

  render() {
    const { artistName, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{albumName}</h2>
        <h4 data-testid="artist-name">{artistName}</h4>
        <MusicCard musics={ musics } />
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
