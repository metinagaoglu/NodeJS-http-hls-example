const Video = require('../models/Video');
const storageService = require('../storage/minio');

exports.listVideoByBucket = async(req,res) => {
    storageService.listFilesByBucket(req.body.videobucket)
    .then((data) => {
        res.json(data);
    })
    .catch((e) => {
        console.log(e);
    });
}

exports.listVideos = async(req,res) => {
    const promise = Video.find({});
    promise.then((data) => {
        res.json(data)
    }).catch((e) => {
        console.log(e)
    })
}