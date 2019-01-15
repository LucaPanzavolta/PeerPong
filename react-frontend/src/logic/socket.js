import io from 'socket.io-client';
import { createPeerConnection, handleVideoOfferMsg, handleVideoAnswerMsg, handleNewICECandidateMsg } from './webrtc';
import { askCameraStream } from './askStreams';
import log from './helpers';

//const hostname = window.location.hostname; //change it back to window.location.hosti
const socket = io.connect(`wss://codeworks-solo-project.herokuapp.com/`);

socket.on('connect', () => {
  log('socket opened...');
});

socket.on('connect_error', (error) => {
  log('Connection error to socket.io server...');
});

socket.on('join-room', (msg) => {
  switch (msg) {
    case 'waiting-for-other-person':
      log(msg);
      document.getElementById('status-message').innerHTML = msg;
      break;
    case 'ready-for-videocall':
      log(msg);
      createPeerConnection(true);
      askCameraStream();
      document.getElementById('status-message').innerHTML = 'Connected';
      document.getElementById('status-ball').classList.add("green-ball");
      break;
    case 'too-many-people':
      log(msg);
      document.getElementById('status-message').innerHTML = msg;
      break;
    default:
      log('error of some sort with the rooms');
  }
});

socket.on('video-offer', (sdp) => {
  log('i received an offer for videochat');
  handleVideoOfferMsg(sdp);
  document.getElementById('status-message').innerHTML = 'Connected';
  document.getElementById('status-ball').classList.add("green-ball");

});

socket.on('video-answer', (sdp) => {
  log('i received an answer for videochat');
  handleVideoAnswerMsg(sdp);
  document.getElementById('status-message').innerHTML = 'Connected';
  document.getElementById('status-ball').classList.add("green-ball");

});

socket.on('new-ice-candidate', (sdp) => {
  log('i received a new ice candidate remotelily from other peer');
  handleNewICECandidateMsg(sdp);
});


export default socket;



