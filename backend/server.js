const dotenv = require('dotenv').config({ path: '/home/cervante/Desktop/webrtc-solo-project/variables.env' });
const express = require('express');
const app = express();
const socket = require('socket.io');
const path = require('path');
const { addSocketToRoom, removeSocketsfromRoom, getOtherSocketInRoom } = require('./redis-controller');
const { log } = require('./helpers');
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, '../frontend')));
//app.use(express.static('../react-frontend/build'));

console.log('This is the path im serving', path.join(__dirname, '../react-frontend/build'));

const server = app.listen(PORT, function () {
  console.log(`listening for requests on port ${PORT}`);
});
const io = socket(server);

io.on('connection', (socket) => {
  let connectedToRoom = null;
  log('made socket connection', socket.id);
  log('active connections at present', Object.keys(io.sockets.sockets));

  socket.on('join-room', (roomName) => {
    let response = addSocketToRoom(roomName, socket);
    if (response) connectedToRoom = roomName;
  });

  socket.on('video-offer', async (sdp) => {
    let otherSocketId = await getOtherSocketInRoom(connectedToRoom, socket);
    console.log('other socket in video offer', otherSocketId);
    socket.to(otherSocketId).emit('video-offer', sdp);
  });

  socket.on('video-answer', async (sdp) => {
    let otherSocketId = await getOtherSocketInRoom(connectedToRoom, socket);
    socket.to(otherSocketId).emit('video-answer', sdp);
  });

  socket.on('new-ice-candidate', async (candidate) => {
    let otherSocketId = await getOtherSocketInRoom(connectedToRoom, socket);
    socket.to(otherSocketId).emit('new-ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    if (connectedToRoom) {
      removeSocketsfromRoom(connectedToRoom);
      connectedToRoom = null;
    }
    log('socket disconnected', socket.id);
    log('active connnections', Object.keys(io.sockets.sockets));
  });
});

