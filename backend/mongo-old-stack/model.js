const mongoose = require('./db');

const Schema = mongoose.Schema;

const Messages = new Schema({
  content: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String
  }
});

const Rooms = new Schema({
  name: {
    type: String,
    required: true,
  },
  peers: {
    type: [String],
    default: []
  },
  messages: [Messages]
});


const RoomsModel = mongoose.model('RoomsModel', Rooms);

module.exports = RoomsModel;