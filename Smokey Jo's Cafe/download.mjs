import ytdl from '@distube/ytdl-core';
import fs from 'fs';

console.log('Starting download...');
const stream = ytdl('https://www.youtube.com/watch?v=1w7OgIMMRc4', {
  filter: 'audioandvideo',
  quality: 'lowest'
});

stream.pipe(fs.createWriteStream('public/rock.mp4'));
stream.on('end', () => console.log('Download complete!'));
stream.on('error', (err) => console.error('Download error:', err));
