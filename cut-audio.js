const MP3Cutter = require('mp3-cutter');
const path = require('path');
const fs = require('fs');

const src = path.join(__dirname, 'public', 'carin-leon.mp3');
const dest = path.join(__dirname, 'public', 'carin-leon-cut.mp3');

console.log('Trimming the first 26 seconds...');
MP3Cutter.cut({
    src: src,
    target: dest,
    start: 26
});
console.log('Done trimming. Replacing original file...');

fs.unlinkSync(src);
fs.renameSync(dest, src);
console.log('Successfully updated carin-leon.mp3');
