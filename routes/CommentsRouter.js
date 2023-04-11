const express = require('express');
const CommentsRouter = express.Router();
const bodyParser = require('body-parser');
const { photoController, commentController } = require('../controllers')

CommentsRouter.use(bodyParser.urlencoded());

CommentsRouter.route('/:photoId')
    .get(photoController.getPhotoWithComments)
    .post(commentController.createComment);

module.exports = CommentsRouter;