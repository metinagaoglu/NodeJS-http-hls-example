const express = require('express');
const router = express.Router();

const Video = require('../models/Video');
const storageService = require('../storage/minio');

router.get('/videobucket', (req, res) => {
    storageService.listFilesByBucket('videobucket')
        .then((data) => {
            res.json(data);
        })
        .catch((e) => {
            console.log(e);
        });
})

router.get('/videos', (req, res) => {
    const promise = Video.find({});
    promise.then((data) => {
        res.json(data)
    }).catch((e) => {
        console.log(e)
    })
})

module.exports = router;