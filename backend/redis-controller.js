const redis = require('./redis');
const { log } = require('./helpers');

const addSocketToRoom = async (roomName, socket) => {

  let retrieved = await new Promise((resolve, reject) => {
    redis.get(roomName, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  log(`Status of the room ${roomName}`, retrieved);

  if (retrieved === null) {
    redis.set(roomName, socket.id);
    socket.emit('join-room', 'waiting-for-other-person');
    return true;
  } else if (retrieved.includes(':')) {         //there are already two people
    socket.emit('join-room', 'too-many-people');
    return false;
  } else {                                      //there is only one person
    redis.set(roomName, retrieved + ':' + socket.id);
    socket.emit('join-room', 'ready-for-videocall');
    return true;
  }
};

const removeSocketsfromRoom = (room) => {
  redis.del(room);
  log(`Room ${room} deleted.`);
}

const getOtherSocketInRoom = async (room, socket) => {
  let retrieved = await new Promise((resolve, reject) => {
    redis.get(room, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  if (!retrieved) return null;
  let otherSocketInRoom = retrieved.split(':').filter(el => el !== socket.id)[0];
  return otherSocketInRoom;
};


module.exports = {
  addSocketToRoom,
  removeSocketsfromRoom,
  getOtherSocketInRoom
};