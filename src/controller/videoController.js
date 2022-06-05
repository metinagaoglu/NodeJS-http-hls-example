const Video = require('../models/Video');
const storageService = require('../storage/minio');
const asyncHandler = require('express-async-handler')

exports.listVideoByBucket = asyncHandler( async(req,res) => {
    const videoBuckets = await storageService.listFilesByBucket(req.body.videobucket);
    res.json(videoBuckets);
});

exports.listVideos = asyncHandler( async(req,res) => {
    const videos = await Video.find({});
    res.json(videos);
});

exports.getVideoById = asyncHandler( async(req, res) => {
    const video = await Video.find({ _id: req.params.id });
    res.json(video);
});