const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');

app.get('/', (req,res) => {
    return res.status(200).sendFile(`${__dirname}/view/index.html`);
});

//TODO: enviroment variable integration
const server = app.listen(8000);

new hls(server, {

    provider: {
        exists: (req,cb) => {
            console.log(req.url);
            const ext = req.url.split('.').pop();

            // Extension check
            if( ext !== 'm3u8' && ext !== 'ts') {
                return cb(null,true);
            }

            fs.access(__dirname + req.url , fs.constants.F_OK, (err) => {
                if(err) {
                    console.log('File does not exists');
                    return cb(null,false);
                }
                cb(null,true);
            });
        },

        //A function that is ran on requests for .m3u8 file. Pass null and stream to cb.
        getManifestStream: (req,cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            console.log("manifest");
            cb(null,stream);
        },

        // A function that is ran on requests for .ts file. Pass null and stream to cb.
        getSegmentStream: (req,cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            console.log("segment");
            cb(null,stream);
        }
    }
});