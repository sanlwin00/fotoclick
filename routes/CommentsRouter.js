const express = require('express');
const CommentsRouter = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
const session = require('express-session');

CommentsRouter.use(bodyParser.urlencoded());

CommentsRouter.route('/:photoId')
    .post((request, response)=>{        
        const photoId = request.params.photoId; 
        const userId = request.user.id;
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
        db.photo
            .findOne({
                where: {id: photoId},
                include: [
                    { model: db.user, as: 'user' }, 
                    { model: db.comment, as: 'comments', include: [{ model: db.user, as: 'user'}]}
                ]
            })
            .then((photo)=>{                
                response.render("comment",{photo: photo, comments: photo.comments, requestUrl: request.url} );
            })
            .catch((error)=> {
                response.send(error);
            });        
    });

module.exports = CommentsRouter;