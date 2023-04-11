const db = require('../models');
const bcrypt = require('bcryptjs')
const saltRounds = 10;

exports.validateUser = (request, response)=>{
    const password = request.body.password;
    const username = request.body.username;
    db.user
        .findOne({where:{username:username}})
        .then(async (user)=>{
            if(user === null)
            {
                response.status(401);
                response.redirect("/badlogin");
            }
            else
            {
                bcrypt.compare(password, user.password, (error, same)=>{
                    if(same){                            
                        request.session.user = { id: user.id, username: user.username};                            
                        if(request.body.redirectUrl)
                            response.redirect(request.body.redirectUrl);
                        else    
                            response.redirect("/");
                    }
                    else
                    {
                        response.status(401);
                        console.log("401 error");
                        response.redirect("/invalidlogin");
                    }
                })
                
            }
        })
        .catch((error)=>{
            console.log(error);
            response.status(500).send("Error occured!");
        })
}

exports.createUser = async (request, response)=>{
    const email = request.body.email;
    const password = request.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const username = request.body.username;
    db.user
        .create({email: email, username: username, password: encryptedPassword})
        .then((user)=>{
            response.redirect("/login");
        })
        .catch((error)=>{
            console.log(error);
            response.status(500).send("Error occured!");
        })
}