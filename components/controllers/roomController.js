const Room = require('../Models/room');
const generateRoomId = require('../utilities/roomIdGenerator');

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create({ roomId: generateRoomId(), participants: [req.user._id] });
    return res.status(201).json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.joinRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOneAndUpdate(
      { roomId },
      { $addToSet: { participants: req.user.userId } },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getRoomDetails = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId }).populate('participants', 'email');
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    await Room.findOneAndDelete({ roomId });
    return res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
