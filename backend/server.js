const app = require('express')();
const socket = require('socket.io');
const { updateRoomsStatus, updateMessagesInRoom } = require('./controller');
const { log } = require('./helpers');
const rooms = {};

const server = app.listen(4000, function () {
  console.log('listening for requests on port 4000');
});
const io = socket(server);

io.on('connection', (socket) => {
  let connectedToRoom = null;
  log('made socket connection', socket.id);
  log('active connections', Object.keys(io.sockets.sockets));

  socket.on('join-room', (roomName) => {
    updateRoomsStatus(roomName, socket);
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

  socket.on('chat-message', (msg) => {
    updateMessagesInRoom();
  });

  socket.on('disconnect', () => {
    if (connectedToRoom) {
      rooms[connectedToRoom] = rooms[connectedToRoom].filter(el => el !== socket.id);
    }
    log('socket disconnected', socket.id);
    log('active connnections', Object.keys(io.sockets.sockets));
    log('State of the rooms at present', rooms);
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