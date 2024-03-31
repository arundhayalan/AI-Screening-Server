
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name:String,
    data: String,
    contentType: String,

});

const Video = mongoose.model('videoRecordings', videoSchema);

module.exports = Video;
