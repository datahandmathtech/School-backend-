const fs = require('fs');
const path = require('path');
const { cloudinary, upload } = require('./config/cloudinary');

// Just test if cloudinary can connect and list something, or use uploader directly
cloudinary.api.ping((err, res) => {
    if (err) console.error("Cloudinary Ping Error:", err);
    else console.log("Cloudinary Ping Success:", res);
});
