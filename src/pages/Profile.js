import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: true,
      user: {},
    };
  }

  componentDidMount() {
    this.showUser();
  }

  showUser = async () => {
    this.setState({ isLoaded: false });
    const user = await getUser();
    this.setState({ isLoaded: true, user });
  }

  render() {
    const { isLoaded, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { !isLoaded ? <Loading /> : (
          <section>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <h3>NOME</h3>
            <p>{ user.name }</p>
            <h3>E-MAIL</h3>
            <p>{ user.email }</p>
            <h3>Descrição</h3>
            <p>{ user.description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
