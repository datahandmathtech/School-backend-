const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('Call Now') || content.includes('Contact Concierge')) {
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('Call Now') || line.includes('Contact Concierge')) {
         console.log('--- ' + file + ' : ' + (index + 1) + ' ---');
         console.log(lines.slice(Math.max(0, index - 2), index + 3).join('\n'));
      }
    });
  }
});
