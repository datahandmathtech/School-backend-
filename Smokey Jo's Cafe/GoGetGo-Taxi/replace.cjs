const fs = require('fs');
const path = require('path');

const directory = __dirname;

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md') || file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.txt')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directory);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/Yatree Destination/g, 'GoGetGo Taxi');
  content = content.replace(/YATREE DESTINATION/g, 'GOGETGO TAXI');
  content = content.replace(/Yatree/g, 'GoGetGo');
  content = content.replace(/YATREE/g, 'GOGETGO');
  content = content.replace(/yatree/g, 'gogetgo');
  content = content.replace(/yatreedestination\.com/g, 'gogetgotaxi.com');
  content = content.replace(/info@yatreedestination\.com/g, 'gogetgotaxi@gmail.com');
  
  // Phone replacements
  content = content.replace(/\+917627013579/g, '+9180000505810');
  content = content.replace(/\+91 76270 13579/g, '+91 80000 505810');
  content = content.replace(/\+91 7627013579/g, '+91 80000505810');
  content = content.replace(/76270 13579/g, '80000 505810');
  content = content.replace(/7627013579/g, '80000505810');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
