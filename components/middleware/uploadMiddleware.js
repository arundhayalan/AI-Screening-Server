// middleware/uploadMiddleware.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'videofiles/');
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: storage });

module.exports = upload;
