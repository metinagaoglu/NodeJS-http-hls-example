const express = require('express');
const router = express.Router();

const videoController = require('../controller/videoController');

router.get('/videobucket', videoController.listVideoByBucket);
router.get('/videos', videoController.listVideos);

module.exports = router;