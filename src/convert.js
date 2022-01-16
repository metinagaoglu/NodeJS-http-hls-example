const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const storage = require('./storage/minio');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

let filename = 'example2';

ffmpeg('videos/'+filename+'.mp4',{ timeout: 40000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10', // Set length of segmented video in seconds.
    '-hls_list_size 0',
    '-f hls' // it should be ‘hls’.
])
.output("videos/"+filename+"/"+filename+".output.m3u8")
.on('end', () => {
    fs.readdir("videos/"+filename,(err,files) => {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
            storage.uploadFile(file,"videos/"+filename+"/"+file);
            //TODO: remove after upload
        });

    });
}).run();