const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  //array of objects
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usersData'
  }],
  status: {
    type: String,
    enum: ['active', 'ended'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
