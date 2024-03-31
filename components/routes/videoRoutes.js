// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const videoController = require('../controllers/videoController');

router.post('/upload', upload.single('recording'), videoController.uploadRecording);

module.exports = router;
