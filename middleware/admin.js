const isAdmin = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.flash("error", "Please login first!");
        return res.redirect("/login");
    }

    console.log("Logged in user:");
    console.log(req.user);
    console.log("Username:", req.user.username);
    console.log("isAdmin:", req.user.isAdmin);

    if (!req.user.isAdmin) {
        req.flash("error", "You don't have admin access!");
        return res.redirect("/plantings");
    }

    next();
};

module.exports = { isAdmin };