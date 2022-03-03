import React, { Component } from 'react';
import logo from '../logo.png';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found" data-testid="page-not-found">
        <img className="logo" src={ logo } alt="Logo Trybe Tunes" />
        <p id="ops">Oops!</p>
        <p id="not-found">The page you are looking for has not been found.</p>
      </div>
    );
  }
}

export default NotFound;
