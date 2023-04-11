const express = require('express');
const PageRouter = express.Router();
const photoController = require('../controllers/PhotosController')

//home page - display all photos
PageRouter.route("/").get(photoController.getAllPhotos);

//photo upload page - login required
PageRouter.get("/photo", (request, response)=>{        
    if(request.user)        
        response.render("photo");
    else
        response.redirect("login?redirectUrl=/photo");
})

//login page - display message if user is being redirected from somewhere
PageRouter.get("/login", (request, response)=>{    
    if(request.query.redirectUrl)        
        response.render("login", {data: "Please login to continue.", redirectUrl: request.query.redirectUrl});
    else
        response.render("login", {data: "", redirectUrl: ""});
})

//bad login
PageRouter.get("/badlogin", (request, response)=>{    
    response.render("login", {data: "No such user!", redirectUrl: ""});
})

//invalid login
PageRouter.get("/invalidlogin", (request, response)=>{    
    response.render("login", {data: "Invalid login credentials!", redirectUrl: ""});
})

//signup page
PageRouter.get("/signUp", (request, response)=>{    
    response.render("signup");
})

//logout - clear session and redirect to home page
PageRouter.get("/logout", (request, response)=>{    
    request.session.destroy(()=>{
        response.redirect("/");
    })
})

//404 page - page not found
PageRouter.get("/*", (request, response)=>{    
    response.render("404");
})

module.exports = PageRouter;