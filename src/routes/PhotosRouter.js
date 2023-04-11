const express=require('express');
const PhotosRouter = express.Router();
const photoController = require('../controllers/PhotosController')


/* file upload handling using multer */
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
/* END: file upload handling using multer */


PhotosRouter.route('/')
    .get(photoController.getAllPhotos)
    .post(upload.single("photo"), photoController.createPhoto);

module.exports = PhotosRouter;