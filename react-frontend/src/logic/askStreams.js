import log from './helpers';
import { onMouseDown } from '../logic/canvas';
import { myPeerConnection, hasAddTrack, handleGetUserMediaError } from './webrtc';

//capture stream from canvas
export function askCanvasStream() {
  //transform canvas from transparent to colored
  let ctx = document.getElementById("canvas").getContext("2d");
  ctx.canvas.addEventListener('mousedown', onMouseDown);

  ctx.fillStyle = '#2c3e50';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  log("Starting to read stream from canvas");
  let canvasStream = ctx.canvas.captureStream(25);
  console.log('canvas stream tracks', canvasStream.getTracks());

  let newTrack = canvasStream.getTracks()[0];
  updateTracksInConnection(newTrack);
}

//capture camera and mic stream
export async function askCameraStream(hasAddTrack = true) {
  try {
    //if canvas is enabled, disable it first
    let ctx = document.getElementById("canvas").getContext("2d");
    ctx.canvas.removeEventListener("mousedown", onMouseDown);

    log("Requesting webcam access...");

    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 612, height: 288 }       //16:9 ???
    });

    log("-- Local camera stream obtained");
    document.getElementById("local-video").srcObject = stream;

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
export async function askScreenStream() {
  try {
    //if canvas is enabled, disable it first
    let ctx = document.getElementById("canvas").getContext("2d");
    ctx.canvas.removeEventListener("mousedown", onMouseDown);

    log("Requesting screen access...");

    let stream = await navigator.getDisplayMedia({ video: true });
    log("-- Local video screen stream obtained");
    document.getElementById("local-video").srcObject = stream;

    let newVideoTrack = stream.getTracks()[0];
    updateTracksInConnection(newVideoTrack);
  } catch (err) {
    handleGetUserMediaError(err);
  };
}

//updates peer connection adding new video track
//and removing old video track
//it needs to know which was the previous video track
//because removing a track does not update the result of .getSenders()
export async function updateTracksInConnection(newVideoTrack) {
  if (hasAddTrack) {
    log("-- adding new Screen video track to the RTCPeerConnection");

    await myPeerConnection.addTrack(newVideoTrack); //mediaStreamTrack object
    //removeTrack function wants an RTCRtpSender
    let senders = myPeerConnection.getSenders();
    console.log('rtc senders', senders);
    let senderToRemove = senders.filter(el => el.track.kind === 'video' && !el.track.label.includes('screen'))[0];
    console.log('sender to remove', senderToRemove);

    log("-- removing old video track in the RTCPeerConnection");
    await myPeerConnection.removeTrack(senderToRemove); //RTCRtpSender object
  }
}