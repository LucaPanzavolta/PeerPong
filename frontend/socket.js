const socket = io.connect(`ws://still-sierra-50256.herokuapp.com`);
socket.on('connect', () => {
  log('socket opened...');
});

socket.on('join-room', (msg) => {
  switch (msg) {
    case 'waiting-for-other-person':
      log(msg);
      break;
    case 'ready-for-videocall':
      log(msg);
      createPeerConnection();
      askCameraStream();
      break;
    case 'too-many-people':
      log(msg);
      break;
    default:
      log('error of some sort with the rooms');
  }
});

socket.on('video-offer', (sdp) => {
  log('i received an offer for videochat');
  handleVideoOfferMsg(sdp);
});

socket.on('video-answer', (sdp) => {
  log('i received an answer for videochat');
  handleVideoAnswerMsg(sdp);
});

socket.on('new-ice-candidate', (sdp) => {
  log('i received a new ice candidate remotelily from other peer');
  handleNewICECandidateMsg(sdp);
});