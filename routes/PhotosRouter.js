const express=require('express');
const PhotosRouter = express.Router();
const db = require('../models');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, "./public/images");
    },
    filename: (request, file, callback) => {
      callback(null, Date.now() + "--" + file.originalname);
    },
  });
const uploadFilter = function (request, file, callback) {
    
    const fileType = file.mimetype.split('/');
    
    if (fileType[0] === "image") {
    callback(null, true)
    }else{
    callback("You are trying to upload a file that is not an image. Go back and try again", false)
    }
};
  
const upload = multer({ 
fileFilter: uploadFilter,
storage: fileStorageEngine
});

PhotosRouter.route('/')
    .get((request,response) => {        
        db.photo
        .findAll()
        .then((photo) => {
            response.send(photo);
        })
        .catch((error)=>{
            response.send(error);
        })
    });

PhotosRouter.route('/')
    .post(upload.single("photo"), (request, response) => {
        const title = request.body.title;
        const description = request.body.description;
        const medialocation = request.file.filename;
        const userId = global.loggedIn;
        db.photo
            .create({title: title, medialocation: medialocation, description: description, userId: userId})
            .then((photo)=>{
                response.redirect("/");
            })
            .catch((error)=>{
                response.send(error);
            })
    })

module.exports = PhotosRouter;