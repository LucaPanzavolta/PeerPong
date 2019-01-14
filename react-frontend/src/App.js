import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/header';
import VideoContainer from './components/videoContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <VideoContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  socket: state.socket
});

const mapDispatchToProps = (dispatch) => ({
  /* updateSocketInStore: (socket) => dispatch({
    type: 'SOCKET',
    socket: socket
  }),
  updateRoomNameInStore: (room) => dispatch({
    type: 'ROOM',
    room: room
  }) */
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
