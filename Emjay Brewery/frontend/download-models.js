const fs = require('fs');
const https = require('https');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

const files = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2'
];

async function downloadFiles() {
  for (const file of files) {
    const filePath = path.join(modelsDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Downloading ${file}...`);
      await new Promise((resolve, reject) => {
        const req = https.get(baseUrl + file, (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`Failed to get '${file}' (${res.statusCode})`));
            return;
          }
          const fileStream = fs.createWriteStream(filePath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Finished ${file}`);
            resolve();
          });
        });
        req.on('error', reject);
      });
    } else {
      console.log(`${file} already exists.`);
    }
  }
}

downloadFiles().then(() => console.log('All models downloaded.')).catch(console.error);
