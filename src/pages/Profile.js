import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Profile.css';

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
      <div>
        <Header />
        { !isLoaded ? <Loading /> : (
          <section className="profile-page">
            <div className="link-container">
              { user.image ? <img id="user-image" src={ user.image } alt="User" />
                : <FontAwesomeIcon className="big-icon" icon={ faUser } size="4x" />}
              <Link id="profile-link" to="/profile/edit">Edit Profile</Link>
            </div>
            <p className="profile-tag">Name</p>
            <p className="profile-info">{ user.name }</p>
            <p className="profile-tag">E-mail</p>
            <p className="profile-info">{ user.email }</p>
            <p className="profile-tag">Description</p>
            <p className="profile-info">{ user.description }</p>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
