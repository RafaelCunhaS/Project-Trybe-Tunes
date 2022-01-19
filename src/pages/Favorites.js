import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.showFavorites();
  }

  showFavorites = async () => {
    this.setState({ isLoaded: false });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoaded: true });
  }

  render() {
    const { isLoaded, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {!isLoaded ? <Loading />
          : <MusicCard musics={ favoriteSongs } showFavorites={ this.showFavorites } />}
      </div>
    );
  }
}

export default Favorites;
