import React, { Component } from 'react';
import placeholder from '../assets/avatar/placeholder.png';

class LocalVideo extends Component {
  render() {
    return (
      <div id="local-content">
        <video id="local-video" autoPlay muted></video>
      </div>
    );
  }
}

export default LocalVideo;

