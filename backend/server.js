const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const socket = require('socket.io');
const { addSocketToRoom, removeSocketsfromRoom, getOtherSocketInRoom } = require('./redis-controller');
const { log } = require('./helpers');
const PORT = process.env.PORT;

const server = app.listen(PORT, function () {
  console.log(`Listening for requests on port ${PORT}`);
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

/* console.log('path is ', path.join(__dirname, '../react-frontend/public'));
app.use(express.static(path.join(__dirname, '../react-frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-frontend/build/index.html'));
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../react-frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname = '/app/react-frontend/build/index.html'));
  })
} */

