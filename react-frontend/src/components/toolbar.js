import React, { Component } from 'react';
import { selectFile, sendFileToPeer } from '../logic/dataChannel';
import icon1 from '../assets/icons/001-conference.svg';
import icon2 from '../assets/icons/010-mail.svg';
import icon3 from '../assets/icons/013-videocall-1.svg';
import icon4 from '../assets/icons/024-megaphone.svg';

import '../styles/toolbar.css';

class Toolbar extends Component {

  render() {
    return (
      <div id="toolbar">

        <input
          type="file"
          id="file-input"
          onChange={sendFileToPeer}
          style={{ display: 'none' }}>
        </input>

        <img className="icons" src={icon1} alt="icon1" onClick={selectFile} />
        <img className="icons" src={icon2} alt="icon2" />
        <img className="icons" src={icon3} alt="icon3" />
        <img className="icons" src={icon4} alt="icon4" />
      </div >
    );
  }
}

export default Toolbar;

