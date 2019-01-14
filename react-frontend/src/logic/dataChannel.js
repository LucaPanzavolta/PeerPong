import { myPeerConnection } from '../logic/webrtc';

export function selectFile() {
  const fileInput = document.getElementById("file-input");
  fileInput.click();
  console.log('buzzu', myPeerConnection);
}

export function sendFileToPeer() {
  let fileToSend = document.getElementById('file-input').files[0];
  console.log('file to send', fileToSend);

  //open data channel 
  createDataChannel();
}

function handleSendChannelOpen() {
  console.log('data channel on open callback');
}

function handleSendChannelClose() {
  console.log('data channel on close callback')
}

function createDataChannel() {
  let dataChannel = myPeerConnection.createDataChannel('sendChannel');
  dataChannel.onopen = handleSendChannelOpen;
  dataChannel.onclose = handleSendChannelClose;
}
