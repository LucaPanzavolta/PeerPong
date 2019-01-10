const express = require('express');
const app = express();
const socket = require('socket.io');
const path = require('path');
const { addSocketToRoom, removeSocketsfromRoom } = require('./redis-controller');
const { log } = require('./helpers');
const rooms = {};
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/hello', (req, res) => res.send('hello'))

const server = app.listen(PORT, function () {
  console.log('listening for requests on port 4000');
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

  socket.on('video-offer', (sdp) => {
    socket.broadcast.emit('video-offer', sdp);
  });

  socket.on('video-answer', (sdp) => {
    socket.broadcast.emit('video-answer', sdp);
  });

  socket.on('new-ice-candidate', (candidate) => {
    socket.broadcast.emit('new-ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    if (connectedToRoom) {
      removeSocketsfromRoom(connectedToRoom);
    }
    log('socket disconnected', socket.id);
    log('active connnections', Object.keys(io.sockets.sockets));
  });
});





/* if (!rooms[roomName] || (rooms[roomName] && rooms[roomName].length === 0)) {
      rooms[roomName] = [socket.id];
      socket.emit('join-room', 'waiting-for-other-person');
      connectedToRoom = roomName;
    } else if (rooms[roomName] && rooms[roomName].length === 1) {
      rooms[roomName].push(socket.id);
      socket.emit('join-room', 'ready-for-videocall');
      connectedToRoom = roomName;
    } else if (rooms[roomName].length >= 2) {
      socket.emit('join-room', 'too-many-people');
    } else {
      socket.emit('join-room', 'error');
    }
    log('State of the rooms at present', rooms);
  } */