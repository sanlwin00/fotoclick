function checkLoginSession(req, res, next)
{   const loggedInUser = req.session.user;
    if (loggedInUser){        
        req.user = res.locals.user = loggedInUser;        
    }
    else {
        res.locals.user = null;
    }
    next();
}

function authenticateUser(req, res, next){
    if (req.user == null){
        return res.status(403).send('Please login!');
    }
    next();
}

module.exports = {
    authenticateUser,
    checkLoginSession
}