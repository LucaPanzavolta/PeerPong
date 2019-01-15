import React, { Component } from 'react';
import avatar from '../assets/avatar/man.svg';
import '../styles/header.css';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <h1>PeerPong</h1>
        <div id="status">
          <div id="status-ball"></div>
          <div id="status-message"></div>
        </div>
        <div>
          <p id="username">Alan Turing</p>
          <img id="avatar" src={avatar} alt="avatar" />
        </div>
      </div>
    );
  }
}

export default Header;

