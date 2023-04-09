const express = require('express');
const CommentsRouter = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
const session = require('express-session');

CommentsRouter.use(bodyParser.urlencoded());

CommentsRouter.route('/:photoId')
    .post((request, response)=>{        
        const photoId = request.params.photoId; 
        const userId = global.loggedIn;
        const content = request.body.comment;       
        db.comment
            .create({userId:userId, photoId: photoId, content: content})
            .then((comment)=>{
                response.redirect(`/comments${request.url}`);
            })
            .catch((error)=>{
                response.send(error);
            });
    });

CommentsRouter.route('/:photoId')
    .get((request, response)=>{        
        const photoId = request.params.photoId;     
        db.comment
            .findAll({where:{ photoId: photoId}})
            .then((comments)=>{
                db.photo
                    .findOne({where: {id: photoId}})
                    .then((photo)=>{
                        response.render("comment",{photo: photo, comments: comments, requestUrl: request.url} );
                    })
                    .catch((error)=> {
                        response.send(error);
                    });
            })
            .catch((error)=>{
                response.error("Failed to retrieve comments!", error);
            });
    });

module.exports = CommentsRouter;