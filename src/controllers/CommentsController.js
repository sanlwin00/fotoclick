const db = require("../models");

exports.createComment = (request, response)=>{          
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
}
