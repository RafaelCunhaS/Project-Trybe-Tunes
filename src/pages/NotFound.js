import React, { Component } from 'react';
import logo from '../logo.png';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found" data-testid="page-not-found">
        <img className="logo" src={ logo } alt="Logo Trybe Tunes" />
        <p id="ops">Ops!</p>
        <p id="not-found">A página que você está procurando não foi encontrada.</p>
      </div>
    );
  }
}

export default NotFound;
