import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { getUser } from '../services/userAPI';
import './Header.css';
import logoWhite from '../logoWhite.png';

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
    if (!isLoaded) return <p id="loading">Loading...</p>;
    return (
      <div>
        <header data-testid="header-component">
          <div className="header1">
            <img className="logo-header" src={ logoWhite } alt="Logo" />
            <div className="user">
              <FontAwesomeIcon className="user-icon" icon={ faUser } size="lg" />
              <p data-testid="header-user-name">{user}</p>
            </div>
          </div>
          <nav className="header2">
            <NavLink
              className="head"
              to="/search"
              data-testid="link-to-search"
              activeStyle={ { backgroundColor: '#036B52', color: '#FFF' } }
            >
              Search
            </NavLink>
            <NavLink
              className="head"
              to="/favorites"
              data-testid="link-to-favorites"
              activeStyle={ { backgroundColor: '#036B52', color: '#FFF' } }
            >
              Favorites
            </NavLink>
            <NavLink
              className="profile head"
              to="/profile"
              data-testid="link-to-profile"
              activeStyle={ { backgroundColor: '#036B52', color: '#FFF' } }
            >
              Profile
            </NavLink>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
