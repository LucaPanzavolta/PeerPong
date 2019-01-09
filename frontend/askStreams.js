let mediaConstraints = {
  audio: true,
  video: true
};

let screenShareConstraints = { video: true };

//capture stream from canvas
function askCanvasStream() {
  log("Starting to read stream from canvas");
  let canvasStream = ctx.canvas.captureStream(25);
  video.srcObject = canvasStream;
}

//capture camera and mic stream
function askLocalStream() {
  log("Requesting webcam access...");

  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 612, height: 288 }
  })
    .then(function (localStream) {
      log("-- Local camera stream obtained");
      window.banana = localStream;
      console.log('window object', window);
      document.getElementById("local_video").srcObject = localStream;
      if (hasAddTrack) {
        log("-- Adding tracks to the RTCPeerConnection");
        localStream.getTracks().forEach(track => {
          log('im a track');
          myPeerConnection.addTrack(track, localStream)
        });
      } else {
        log("-- Adding stream to the RTCPeerConnection");
        myPeerConnection.addStream(localStream);
      }
    })
    .catch(handleGetUserMediaError);
}

//capture screen stream
function askScreenStream() {
  log("Requesting screen access...");

  //stop video track in the peer connection
  console.log('window object', window);
  /* let videoTrack = window.cameraStream.getVideoTracks()[0];
  myPeerConnection.removeTrack(videoTrack, window.cameraStream);
  window.cameraStream = null;
  log('video track removed'); */

  navigator.getDisplayMedia(screenShareConstraints)
    .then(localStream => {
      log("-- Local video screen stream obtained");
      console.log('window object', window);
      //window.screenStream = localStream;
      //console.log('tracks in screen stream', localStream.getTracks().length, localStream.getTracks());
      //updateTracksInConnection();

      document.getElementById("local_video").srcObject = localStream;


    })
    .catch(handleGetUserMediaError);
}

function updateTracksInConnection(newVideoTrack) {
  if (hasAddTrack) {
    log("-- Adding track to the RTCPeerConnection");
    localStream.getTracks().forEach(track => {
      console.log('im a track', track);
      myPeerConnection.addTrack(track, localStream)
    });
  } else {
    log("-- Adding stream to the RTCPeerConnection");
    myPeerConnection.addStream(localStream);
  }
  //add new video track to connection
  myPeerConnection.addTrack()
  console.log('screen stream video track', screenStream.getVideoTracks()[0], screenStream.getVideoTracks().length);
  //myPeerConnection.addTrack(window.screenStream)
  //add screen stream to peer connection
}