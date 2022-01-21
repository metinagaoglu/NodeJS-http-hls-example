const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const storageService = require('./storage/minio');
const fs = require('fs');
const db = require('./database/connection')();
const Video = require('./models/Video');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

let filename = 'sample';
let outputFolder = "./videos/"+filename;

if (!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder);
}

ffmpeg('videos/'+filename+'.mp4',{ timeout: 40000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10', // Set length of segmented video in seconds.
    '-hls_list_size 0',
    '-f hls' // it should be ‘hls’.
])
.output(outputFolder+"/"+filename+".output.m3u8")
.on('end', () => {
    fs.readdir(outputFolder, (err, files) => {

        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err.code);
        }

        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            const ext = file.split('.').pop();

            const video = new Video({
                name: file,
                path: outputFolder + "/" + file,
                size: 123, //TODO: calculate
                extension: ext,
                available: true
            });

            video.save((err, data) => {

                if (err != null) {
                    return;
                }
                storageService.uploadFile(file, outputFolder + "/" + file)
                    .then((fileInfo) => {
                        fs.rmSync(outputFolder, {
                            recursive: true
                        }, () => {
                            console.log("Removed");
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });

        });

    });
})
.on('error', function (err, stdout, stderr) {
        if (err) {
            console.log(err.message);
            console.log("stdout:\n" + stdout);
            console.log("stderr:\n" + stderr);
        }
    })
.run();