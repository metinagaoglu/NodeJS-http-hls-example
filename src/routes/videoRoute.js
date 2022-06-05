const express = require('express');
const router = express.Router();

const validationMiddleware = require('../middleware/validationMiddleware');
const videoController = require('../controller/videoController');

const videoListRequest = require('../validation/videoRequest');

router.get('/storage', validationMiddleware(videoListRequest.videoListSchema), videoController.listVideoByBucket);
router.get('/videos', videoController.listVideos);
router.get('/:id', validationMiddleware(videoListRequest.getVideoByIdSchema) , videoController.getVideoById);

module.exports = router;