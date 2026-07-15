//admin middleware
const isAdmin = (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.flash("error","Please login first!");
        return res.redirect("/login");
    }


    if(!req.user.isAdmin){
        req.flash("error","You don't have admin access!");
        return res.redirect("/plantings");
    }


    next();

}

module.exports = {isAdmin};
