const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();


//home page route
router.get("/",function(req,res){
    res.render("landing");
});


//show signup
router.get("/signup",function(req,res){
    res.render("signUp");
});
//handel sign up
router.post("/signup", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err, user){
        if (err) {
            console.log(err);
            return res.render("signUp");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

//show login form

router.get("/login",function(req,res){
    res.render("login");
});

//handle login
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"

    }),function(req,res){

});

//logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;