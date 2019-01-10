//capture stream from canvas
function askCanvasStream() {
  log("Starting to read stream from canvas");
  let canvasStream = ctx.canvas.captureStream(25);
  video.srcObject = canvasStream;
}

//capture camera and mic stream
async function askCameraStream() {
  try {
    log("Requesting webcam access...");

    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 612, height: 288 }       //16:9 ???
    });

    log("-- Local camera stream obtained");
    document.getElementById("local_video").srcObject = stream;

    if (hasAddTrack) {
      log("-- Adding tracks to the RTCPeerConnection");
      stream.getTracks().forEach(track => {
        log('im a track');
        myPeerConnection.addTrack(track, stream)
      });
    } else {
      log("-- Adding stream to the RTCPeerConnection");
      myPeerConnection.addStream(stream);
    }
  } catch (err) {
    handleGetUserMediaError(err);
  }
}

//capture screen stream
async function askScreenStream() {
  try {
    log("Requesting screen access...");

    let stream = await navigator.getDisplayMedia({ video: true });
    log("-- Local video screen stream obtained");
    document.getElementById("local_video").srcObject = stream;

    let newVideoTrack = stream.getTracks()[0];
    updateTracksInConnection(newVideoTrack);
  } catch (err) {
    handleGetUserMediaError(err);
  };
}

async function updateTracksInConnection(newVideoTrack) {
  if (hasAddTrack) {
    log("-- updating tracks in the RTCPeerConnection");

    await myPeerConnection.addTrack(newVideoTrack);
    //removeTrack function wants an RTCRtpSender
    /* let senders = myPeerConnection.getSenders();
    console.log('rtc senders', senders);
    let senderToRemove = senders.filter(el => el.track.label.includes('screen'))[0];
    console.log('sender to remove', senderToRemove);
    await myPeerConnection.removeTrack(senderToRemove); */
  }
}