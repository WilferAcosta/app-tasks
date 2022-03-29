//para mostrar cuand oesten logea do pueda ver su login

module.exports ={
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req,res,next){
        if (!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};