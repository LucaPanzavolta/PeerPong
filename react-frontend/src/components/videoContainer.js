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
      <div id="video-container">
        <ReceivedVideo />
        <LocalVideo />
        <Canvas />
        <Toolbar />
        <CallButtons />
      </div>
    );
  }
}

export default VideoContainer;

