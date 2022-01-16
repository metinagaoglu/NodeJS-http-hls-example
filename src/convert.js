const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg('videos/example.mp4',{ timeout: 40000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10', // Set length of segmented video in seconds.
    '-hls_list_size 0',
    '-f hls' // it should be ‘hls’.
])
.output('videos/example.output.m3u8')
.on('end', () => {
    console.log('end');
}).run();