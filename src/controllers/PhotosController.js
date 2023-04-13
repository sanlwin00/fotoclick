const db = require("../models");

exports.getAllPhotos = (request, response)=>{    
    db.photo
        .findAll()
        .then((photos)=>{                   
            response.render("index", {data : photos});
        })
        .catch((error)=>{
            response.send(error);
        });        
}

exports.createPhoto = (request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const medialocation = request.file.filename;
    const userId = request.user.id;
    db.photo
        .create({title: title, medialocation: medialocation, description: description, userId: userId})
        .then((photo)=>{
            response.redirect("/");
        })
        .catch((error)=>{
            response.send(error);
        })
}
