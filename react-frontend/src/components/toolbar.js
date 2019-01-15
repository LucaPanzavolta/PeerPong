import React, { Component } from 'react';
import { selectFile, sendFileToPeer } from '../logic/dataChannel';
import folder from '../assets/icons/folder.svg';
import chat from '../assets/icons/chat.svg';
import calendar from '../assets/icons/calendar.svg';
import download from '../assets/icons/download.svg';

import settings from '../assets/icons/settings.svg';
import exit from '../assets/icons/exit.svg';
import '../styles/toolbar.css';

class Toolbar extends Component {

  render() {
    return (
      <div id="toolbar">
        <div>
          <input
            type="file"
            id="file-input"
            onChange={sendFileToPeer}
            style={{ display: 'none' }}>
          </input>
          <div className="bg-icons">
            <img className="icons" src={folder} alt="folder-icon" onClick={selectFile} />
          </div>
          <div className="bg-icons">
            <img className="icons" src={chat} alt="chat-icon" />
          </div>
          <div className="bg-icons">
            <img className="icons" src={calendar} alt="calendar-icon" />
          </div>
          <div className="bg-icons">
            <img className="icons" src={download} alt="download-icon" />
          </div>
        </div>

        <div>
          <div className="bg-icons">
            <img className="icons" src={settings} alt="settings-icon" />
          </div>
          <div className="bg-icons">
            <img className="icons" src={exit} alt="exit-icon" />
          </div>

        </div>
      </div >
    );
  }
}

export default Toolbar;

