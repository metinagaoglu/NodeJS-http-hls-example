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

        let videoPartitions = [];
        let video;
        const filesCount = files.length-1;

        //listing all files using forEach
        files.forEach(function (file,index) {
            // Do whatever you want to do with the file
            const ext = file.split('.').pop();

            if(ext == 'm3u8') {
                video = new Video({
                    name: file,
                    path: outputFolder + "/" + file,
                    size: 123, //TODO: calculate
                    extension: ext,
                    available: true
                });
            } 

            if(ext == 'ts'){
                videoPartitions.push({
                    name: file,
                    path: outputFolder + "/" + file,
                    size: 123, //TODO: calculate
                });
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

            /**
             * Callback after all asynchronous forEach
             */
            if(index == filesCount) {

                video.partitions = videoPartitions;

                video.save((err, data) => {
        
                    if (err != null) {
                        return;
                    }

                });
            }

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