const express = require('express');
const CommentsRouter = express.Router();
const bodyParser = require('body-parser');
const { photoController, commentController } = require('../controllers')

CommentsRouter.use(bodyParser.urlencoded());

CommentsRouter.route('/:photoId')
    .get(commentController.getPhotoWithComments)
    .post(commentController.createComment);

CommentsRouter.route('/:photoId/:commentId/:reaction').post(commentController.reactComment);

module.exports = CommentsRouter;