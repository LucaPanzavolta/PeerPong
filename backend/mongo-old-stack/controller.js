const Model = require('./model');
const { log } = require('../helpers');

const updateRoomsStatus = async (roomName, socket) => {

  let retrieved = await Model.findOne({ name: roomName });

  if (retrieved === null) {       //room does not exist: create one
    let newRoom = await Model.create({
      name: roomName,
      peers: [socket.id]
    });
    log('Newly created room', newRoom);
    socket.emit('join-room', 'waiting-for-other-person');
  } else {                        //room exists
    if (retrieved.peers.length === 2) {
      socket.emit('join-room', 'too-many-people');
    } else if (retrieved.peers.length === 1) {
      let updatedRoom = await Model.findByIdAndUpdate(retrieved._id, {
        name: roomName,
        peers: [...retrieved.peers, socket.id]
      });
      log('Updated room', updatedRoom);
      socket.emit('join-room', 'ready-for-videocall');
    } else {
      let updatedRoom = await Model.findByIdAndUpdate(retrieved._id, {
        name: roomName,
        peers: [socket.id]
      });
      log('Updated room', updatedRoom);
      socket.emit('join-room', 'waiting-for-other-person');
    }
  }
};

const updateMessagesInRoom = () => {
  console.log('ill update a message in the room');
}

module.exports = {
  updateRoomsStatus,
  updateMessagesInRoom
};