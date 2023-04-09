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
    if(request.session.userId){
        console.log(`userId: ${request.session.userId}`);
        response.render('photo');
    }
    else{
        response.render("login", {data: ""});
    }        
})

PageRouter.get("/login", (request, response)=>{    
    response.render('login', {data: ""});
})

PageRouter.get("/badlogin", (request, response)=>{    
    response.render('login', {data: "No such user!"});
})

PageRouter.get("/invalidlogin", (request, response)=>{    
    response.render('login', {data: "Invalid login credentials!"});
})

PageRouter.get("/signUp", (request, response)=>{    
    response.render('signup');
})

PageRouter.get("/logout", (request, response)=>{    
    request.session.destroy(()=>{
        response.redirect("/");
    })
})

PageRouter.get("/*", (request, response)=>{    
    response.render('404');
})


module.exports = PageRouter;