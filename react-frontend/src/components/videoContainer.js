import React, { Component } from 'react';
import ReceivedVideo from './receivedVideo';
import LocalVideo from './localVideo';
import Canvas from './canvas';
import Toolbar from './toolbar';
import CallButtons from './callButtons';
import '../styles/videoContainer.css';

class VideoContainer extends Component {
  render() {
    return (
      <div id="content-container">
        <div id="video-container">
          <ReceivedVideo />
          <LocalVideo />
          <Canvas />
          <CallButtons />
        </div>
        <Toolbar />
      </div>
    );
  }
}

export default VideoContainer;

