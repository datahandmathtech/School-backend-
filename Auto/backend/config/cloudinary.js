// Force use of hardcoded credentials by removing any conflicting Hostinger environment variables BEFORE Cloudinary SDK initializes
delete process.env.CLOUDINARY_URL;
delete process.env.CLOUDINARY_API_SECRET;
delete process.env.CLOUDINARY_API_KEY;
delete process.env.CLOUDINARY_CLOUD_NAME;

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'donqb7fnf',
  api_key: '276661994538188',
  api_secret: 'gaU-kRZD8ce5dXpurN3rwq1ea8E'
});

const os = require('os');
const upload = multer({ dest: os.tmpdir() });

module.exports = { cloudinary, upload };
