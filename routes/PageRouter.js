const express = require('express');
const PageRouter = express.Router();
const db = require("../models");

//routes
PageRouter.get("/", (request, response) => {    
    db.photo
        .findAll()
        .then((photos)=>{            
            response.render("index", {data : photos});
        });    
})

PageRouter.get("/photo", (request, response)=>{        
    if(global.loggedIn){        
        response.render("photo");
    }
    else{
        response.redirect("login?redirectUrl=/photo");
    }        
})

PageRouter.get("/login", (request, response)=>{    
    if(request.query.redirectUrl)        
        response.render("login", {data: "Please login to continue.", redirectUrl: request.query.redirectUrl});
    else
        response.render("login", {data: "", redirectUrl: ""});
})

PageRouter.get("/badlogin", (request, response)=>{    
    response.render("login", {data: "No such user!", redirectUrl: ""});
})

PageRouter.get("/invalidlogin", (request, response)=>{    
    response.render("login", {data: "Invalid login credentials!", redirectUrl: ""});
})

PageRouter.get("/signUp", (request, response)=>{    
    response.render("signup");
})

PageRouter.get("/logout", (request, response)=>{    
    request.session.destroy(()=>{
        response.redirect("/");
    })
})

PageRouter.get("/*", (request, response)=>{    
    response.render("404");
})


module.exports = PageRouter;