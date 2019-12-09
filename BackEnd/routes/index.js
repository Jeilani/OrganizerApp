const express = require ("express"),
      router = express.Router({mergeParams: true}),
      passport = require("passport"),
      User = require("../models/user"),
      middleware = require("../middleware")


//show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err){
            req.flash("error", err.message);
            res.render("register");
        } else {
        passport.authenticate("local")(req, res, function (){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
            
        });
        }
    });
});

//show login form

router.get("/login", function (req, res) {
    res.render("login");
});

//handle login form logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
    
});


//logout logic route
router.get("/logout", function (req, res){
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});


//EDIT AND UPDATE ROUTES



module.exports = router;