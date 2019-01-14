import React, { Component } from 'react';
import { askScreenStream, askCanvasStream } from '../logic/askStreams';
import { closeVideoCall } from '../logic/webrtc';

import shareScreenIcon from '../assets/icon2/share-screen.svg';
import blackboardIcon from '../assets/icon2/blackboard.svg';
import closeCallIcon from '../assets/icon2/close-call.svg';
import '../styles/callButtons.css';

class CallButtons extends Component {
  render() {
    return (
      <div id="call-buttons">

        <div className="round-bg" onClick={askScreenStream}>
          <img className="call-buttons" src={shareScreenIcon} alt="Share your screen icon" />
        </div>

        <div className="round-bg" onClick={askCanvasStream}>
          <img className="call-buttons" src={blackboardIcon} alt="Share notes on a blackboard icon" />
        </div>

        <div className="round-bg" onClick={closeVideoCall}>
          <img className="call-buttons" src={closeCallIcon} alt="Close current call icon" />
        </div>

      </div>
    );
  }
}

export default CallButtons;

