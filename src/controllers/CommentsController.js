const db = require("../models");

exports.getPhotoWithComments = (request, response)=>{
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
}

exports.createComment = (request, response) => {
    const photoId = request.params.photoId;
    const userId = request.user.id;
    const content = request.body.comment;
    db.comment
        .create({ userId: userId, photoId: photoId, content: content })
        .then((comment) => {
            response.redirect(`/comments${request.url}`, { commented: comment });
        })
        .catch((error) => {
            response.send(error);
        });
}

exports.reactComment = (request, response) => {
    const commentId = request.params.commentId;
    const photoId = request.params.photoId;
    const newReaction = parseInt(request.params.reaction);

    if (request.user) {
        const userId = request.user.id;
        db.comment
            .findOne({ where: { id: commentId } })
            .then((comment) => {
                if (comment) {
                    //check if the user has reacted before
                    db.reaction
                        .findOne({ where: { commentId: comment.id, userId: userId } })
                        .then((existingReaction) => {                            
                            if (existingReaction) {
                                //reset the counter
                                comment.upvoteCount -= parseInt(existingReaction.reaction);
                                comment.save();

                                if (newReaction == parseInt(existingReaction.reaction)) {     
                                    //if the same reaction is received, remove the existing.                               
                                    existingReaction.destroy();
                                    response.redirect(`/comments/${photoId}`);
                                }
                                else {
                                    // if a different reaction is received, remove the existing, add the new reaction and update the counter
                                    existingReaction.destroy();
                                    db.reaction
                                        .create({ userId: userId, commentId: commentId, reaction: newReaction })
                                        .then((reacted) => {
                                            comment.upvoteCount += parseInt(reacted.reaction);
                                            comment.save();
                                            response.redirect(`/comments/${photoId}`);
                                        });                                   
                                }
                            }
                            else{
                                // if there is no existing reaction, create new one
                                db.reaction
                                .create({ userId: userId, commentId: commentId, reaction: newReaction })
                                .then((reacted) => {
                                    comment.upvoteCount += parseInt(reacted.reaction);
                                    comment.save();
                                    response.redirect(`/comments/${photoId}`);
                                });
                            }
                        });


                }
                else {
                    response.status(404).send("Comment not found!")
                }
            })
            .catch((error) => {
                response.send(error);
            });
    }
    else
        response.redirect(`/login?redirectUrl=/comments/${photoId}`);
}
