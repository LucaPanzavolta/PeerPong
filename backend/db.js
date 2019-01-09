const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webrtc-db');

module.exports = mongoose;