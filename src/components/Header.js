import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      user: '',
    };
  }

  componentDidMount() {
    this.showUser();
  }

  showUser = async () => {
    this.setState({ isLoaded: false });
    const newUser = await getUser();
    this.setState({ isLoaded: true, user: newUser.name });
  }

  render() {
    const { isLoaded, user } = this.state;
    if (!isLoaded) return <Loading />;
    return (
      <div>
        <header data-testid="header-component">
          <p data-testid="header-user-name">{user}</p>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </header>
      </div>
    );
  }
}

export default Header;
