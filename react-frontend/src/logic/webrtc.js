import socket from './socket';
import { askCameraStream } from './askStreams';
import log from './helpers';

export let myPeerConnection = null;
export let hasAddTrack = false;
let tracks = 0;

export function handleJoinRoomButton() {
  let roomName = document.getElementById('room').value;
  //socket.emit('join-room', roomName);
}

/* function createDataChannel(myPeerConnection) {
  log('Creating data channel...');

  let dataChannel = myPeerConnection.createDataChannel('luca');
  dataChannel.onopen = (event) => {
    console.log('data channel on open');
  }
  dataChannel.onclose = (event) => {
    console.log('data channel on close');
  }
  dataChannel.onmessage = (event) => {
    console.log('data channel on message');
    console.log('HO LETTO' + event.data);
  }
} */

export function createPeerConnection() {
  log("Setting up a connection...");

  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:numb.viagenie.ca',
        username: 'webrtc@live.com',
        credential: 'muazkh'
      }
    ]
  });

  hasAddTrack = (myPeerConnection.addTrack !== undefined);

  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.onnremovestream = handleRemoveStreamEvent;
  myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;

  //data channel event handlers
  //myPeerConnection.ondatachannel = handleReceiveDataChannel;

  if (hasAddTrack) {
    myPeerConnection.ontrack = handleTrackEvent;
  } else {
    myPeerConnection.onaddstream = handleAddStreamEvent;
  }
}

export function log_error(text) {
  let date = new Date;
  console.error("[" + date.toLocaleTimeString() + "] " + text);
}

export async function handleNegotiationNeededEvent(e) {
  if (myPeerConnection._negotiating == true) return;
  log("*** Negotiation needed");
  myPeerConnection._negotiating = true;
  try {
    log("---> Creating offer");
    const offer = await myPeerConnection.createOffer();
    console.log('im the offer', offer)

    log("---> Creating new description object to send to remote peer");
    await myPeerConnection.setLocalDescription(offer);

    log("---> Sending offer to remote peer");

    //send a video offer to the other peer along with SDP
    socket.emit('video-offer', myPeerConnection.localDescription);
    console.log('in negotiation needed myPeerConnection.localDescription', myPeerConnection.localDescription);
  } catch (e) {
    reportError(e)
  } finally {
    myPeerConnection._negotiating = false;
  }
}

export function handleTrackEvent(event) {

  log("*** Track event");
  tracks++;
  console.log("NUMBER OF TRACKS IS ", tracks);
  document.getElementById("received-video").srcObject = event.streams[0];
}

export function handleAddStreamEvent(event) {
  log("*** Stream added");
  document.getElementById("received-video").srcObject = event.stream;
}

export function handleRemoveStreamEvent(event) {
  log("*** Stream removed");
  closeVideoCall();
}

export function handleICECandidateEvent(event) {
  if (event.candidate) {
    log("Outgoing ICE candidate: " + event.candidate.candidate);
    socket.emit('new-ice-candidate', event.candidate);
  }
}

export function handleICEConnectionStateChangeEvent(event) {
  log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);

  switch (myPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
    case "disconnected":
      closeVideoCall();
      break;
  }
}

export function handleSignalingStateChangeEvent(event) {
  log("*** WebRTC signaling state changed to: " + myPeerConnection.signalingState);
  if (myPeerConnection.signalingState === 'closed') {
    closeVideoCall();
  }
}

export function handleICEGatheringStateChangeEvent(event) {
  log("*** ICE gathering state changed to: " + myPeerConnection.iceGatheringState);
}

export function closeVideoCall() {
  let remoteVideo = document.getElementById("received-video");
  let localVideo = document.getElementById("local-video");

  log("Closing the call");

  if (myPeerConnection) {
    log("--> Closing the peer connection");
    myPeerConnection.onaddstream = null;
    myPeerConnection.ontrack = null;
    myPeerConnection.onremovestream = null;
    myPeerConnection.onnicecandidate = null;
    myPeerConnection.oniceconnectionstatechange = null;
    myPeerConnection.onsignalingstatechange = null;
    myPeerConnection.onicegatheringstatechange = null;
    myPeerConnection.onnotificationneeded = null;

    if (remoteVideo.srcObject) {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
    }

    if (localVideo.srcObject) {
      localVideo.srcObject.getTracks().forEach(track => track.stop());
    }

    remoteVideo.src = null;
    localVideo.src = null;

    myPeerConnection.close();
    myPeerConnection = null;
  }
}

export function handleHangUpMsg(msg) {
  log("*** Received hang up notification from other peer");
  closeVideoCall();
}

export function hangUpCall() {
  closeVideoCall();
}

export async function handleVideoOfferMsg(sdp) {

  //if connection does not exist ask for camera access that is the default video stream
  try {
    if (!myPeerConnection) {
      console.log(' handle video offer msg when connection existst');

      createPeerConnection();
      let desc = new RTCSessionDescription(sdp);
      await myPeerConnection.setRemoteDescription(desc);
      log("Setting up the local media stream...");

      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 612, height: 288 }
      });
      log("-- Local video stream obtained");
      document.getElementById("local-video").srcObject = stream;

      if (hasAddTrack) {
        log("-- Adding tracks to the RTCPeerConnection");
        stream.getTracks().forEach(track =>
          myPeerConnection.addTrack(track, stream)
        );
      } else {
        log("-- Adding stream to the RTCPeerConnection");
        myPeerConnection.addStream(stream);
      }
    } else {
      console.log('handle video offer message when connection exists')
      let newDesc = new RTCSessionDescription(sdp);
      await myPeerConnection.setRemoteDescription(newDesc);
    }

    log("------> Creating answer");

    let answer = await myPeerConnection.createAnswer();
    await myPeerConnection.setLocalDescription(answer);
    log("------> Setting local description after creating answer");

    socket.emit('video-answer', myPeerConnection.localDescription);
    log("Sending answer packet back to other peer");
  } catch (err) {
    console.log(err);
    handleGetUserMediaError(err);
  } finally {
    myPeerConnection._negotiating = false;
  }
}

export function handleVideoAnswerMsg(sdp) {
  log("Call recipient has accepted our call");
  var desc = new RTCSessionDescription(sdp);
  myPeerConnection.setRemoteDescription(desc).catch(reportError);
}

export function handleNewICECandidateMsg(candidate) {
  var candidate = new RTCIceCandidate(candidate);
  log("Adding received ICE candidate: " + JSON.stringify(candidate));
  myPeerConnection.addIceCandidate(candidate)
    .catch(reportError);
}

export function handleGetUserMediaError(e) {
  log('HANDLE GET USER MEDIA ERROR FUNCTION');
  switch (e.name) {
    case "NotFoundError":
      alert("Unable to open your call because no camera and/or microphone" +
        "were found.");
      break;
    case "SecurityError":
    case "PermissionDeniedError":
      // Do nothing; this is the same as the user canceling the call.
      break;
    default:
      alert("Error opening your camera and/or microphone: " + e.message);
      break;
  }
  closeVideoCall();
}

export function reportError(errMessage) {
  log_error("Error " + errMessage.name + ": " + errMessage.message);
}

/* function handleReceiveDataChannel(event) {
  console.log('DATA CHANNEL OPEN!');

  let receiveChannel = event.channel;
  receiveChannel.onopen = function () { console.log('receive channel on open') };
  receiveChannel.onclose = function () { console.log('receive channel on close') };
  receiveChannel.send('TU PUZZI!!!!!!!!!!!!!!');
} */

