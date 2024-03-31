const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/rooms',roomController.createRoom);
router.post('/rooms/:roomId/join', roomController.joinRoom);
router.get('/rooms/:roomId', roomController.getRoomDetails);
router.delete('/rooms/:roomId', roomController.deleteRoom);

module.exports = router;
