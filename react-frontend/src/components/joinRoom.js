import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import socket from '../logic/socket';
import avatar from '../assets/avatar/man.svg';
import '../styles/joinRoom.css';

class JoinRoom extends Component {

  readInputField = () => {
    let input = document.getElementById('room-name');
    let room = input.value;
    socket.emit('join-room', room);
  }

  render() {
    return (
      <div id="join-room-wrapper">
        <div id="join-room-form">
          <img id="profile-photo" src={avatar} alt="avatar" />
          <input id="room-name" type="text" placeholder="Which room do you wanna join?" required></input>
          <Link to="/videochat" id="button-container">
            <button id="join" onClick={this.readInputField}>Join room</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  updateSocketInStore: (socket) => dispatch({
    type: 'SOCKET',
    socket: socket
  }),
  updateRoomNameInStore: (room) => dispatch({
    type: 'ROOM',
    room: room
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinRoom);
