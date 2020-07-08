const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Campground = require("../models/campgrounds");
const router = express.Router();
const middleware = require("../middleware");


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
            req.flash("error", err.message);
            return res.render("signUp");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success","Signed Up as "+ user.username);
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
    req.flash("success","logged out");
    res.redirect("/campgrounds");
});

//user account
router.get("/user", (req,res) =>{
    var currentUsername = req.user.username;
    console.log(req.user);
    Campground.find({author:{username:currentUsername}}, (err,allCampgrounds)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("user",{campgrounds:allCampgrounds});
            console.log(allCampgrounds);            
        }
    }); 
});


module.exports = router;