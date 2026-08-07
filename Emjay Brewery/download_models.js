const fs = require('fs');
const https = require('https');
const path = require('path');

const modelsDir = path.join(__dirname, 'frontend', 'public', 'models');
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

async function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(modelsDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(baseUrl + filename, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get ${filename}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file async.
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading face-api models...');
  for (const file of files) {
    console.log(`Downloading ${file}...`);
    try {
      await downloadFile(file);
      console.log(`Successfully downloaded ${file}`);
    } catch (e) {
      console.error(`Failed to download ${file}:`, e.message);
    }
  }
  console.log('Done!');
}

run();
