const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const Campground = require("../models/campgrounds");
const router = express.Router();
const middleware = require("../middleware");
const { all, route } = require("./campgrounds");
const { Router } = require("express");
const { userCampgrounds } = require("../middleware");
// const { router, delete } = require("./campgrounds");


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

router.get('/user',async(req,res)=>{
    let userCampIds = req.user.userCampgrounds;
    let userCampgrounds =[];
    try {
        for (let index = 0; index < userCampIds.length; index++) {
            const element = userCampIds[index];
            await Campground.findById(element,(err,foundCampground)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (foundCampground) {
                        return userCampgrounds.push(foundCampground);
                    }
                }
            });   
        }
        res.render('user',{userCampgrounds:userCampgrounds})
    } catch (error) {
        res.send("error");
    }
});


module.exports = router;

