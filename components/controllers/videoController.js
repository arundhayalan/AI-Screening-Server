// controllers/videoController.js
const Recording = require('../Models/Recording');
const fs = require('fs');

const uploadRecording = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log(req.file.path);
        const video = new Recording({
            name:req.file.originalname,
          data: req.file.path,
          contentType: req.file.mimetype
        });
        await video.save();
        res.status(201).send('Video uploaded successfully');
      } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).send('Internal Server Error');
      }
};

module.exports = {
  uploadRecording,
};
