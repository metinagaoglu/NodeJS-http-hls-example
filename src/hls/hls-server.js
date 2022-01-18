const storageService = require('../storage/minio');
const hls = require('hls-server');

function run(server) {
    return new hls(server, {

        provider: {
            exists: (req, cb) => {
                // Get extension of file and it's validation
                const ext = req.url.split('.').pop();

                // Extension check
                if (ext !== 'm3u8' && ext !== 'ts') {
                    return cb(null, true);
                }

                // Get base name of file
                let filename = req.url.split('/').reverse()[0];

                storageService.existsFile(filename)
                    .then(() => {
                        return cb(null, true);
                    }).catch(() => {
                        return cb(null, false);
                    });

            },

            //A function that is ran on requests for .m3u8 file. Pass null and stream to cb.
            getManifestStream: (req, cb) => {

                let filename = req.url.split('/').reverse()[0];
                storageService.getFile(filename)
                    .then((stream) => {
                        cb(null, stream);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },

            // A function that is ran on requests for .ts file. Pass null and stream to cb.
            getSegmentStream: (req, cb) => {
                let filename = req.url.split('/').reverse()[0];
                storageService.getFile(filename)
                    .then((stream) => {
                        cb(null, stream);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    });
}

module.exports = {
    run
}