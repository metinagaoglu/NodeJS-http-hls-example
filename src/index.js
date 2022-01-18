const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');
const storageService = require('./storage/minio');

app.get('/', (req,res) => {
    return res.status(200).sendFile(`${__dirname}/view/index.html`);
});

const server = app.listen(8000);

new hls(server, {

    provider: {
        exists: (req,cb) => {
            // Get extension of file and it's validation
            const ext = req.url.split('.').pop();

            // Extension check
            if( ext !== 'm3u8' && ext !== 'ts') {
                return cb(null,true);
            }

            // Get base name of file
            let filename = req.url.split('/').reverse()[0];

            storageService.existsFile(filename)
                .then(() => {
                    console.log("var "+filename);
                    return cb(null, true);
                }).catch(() => {
                    console.log("yok "+filename);
                    return cb(null, false);
                });

        },

        //A function that is ran on requests for .m3u8 file. Pass null and stream to cb.
        getManifestStream: (req,cb) => {

            let filename = req.url.split('/').reverse()[0];
            console.log("fn:"+filename);
            storageService.getFile(filename)
            .then((stream) => {
                cb(null,stream);
            })
            .catch((err) => {
                console.log(err);
            })
        },

        // A function that is ran on requests for .ts file. Pass null and stream to cb.
        getSegmentStream: (req,cb) => {
            let filename = req.url.split('/').reverse()[0];
            storageService.getFile(filename)
                .then((stream) => {
                    cb(null,stream);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
});