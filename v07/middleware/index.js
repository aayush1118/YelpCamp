const Campground = require("../models/campgrounds");
const Comment = require("../models/comment");
const router = require("../routes/campgrounds");
const middlewareObj = {};

//checks logged in user to campgrounds
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if (req.isAuthenticated()) {
        //check logged in user to author
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error","Campground not found")
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();   
                } else {
                    req.flash("error", "Permission Denied!")
                    res.redirect("back");
                }                    
            }
        });
    } else {
        req.flash("error","You have to login first!")
        res.redirect("back");
    }
}

//checks logged in user to comments

middlewareObj.checkCommentOwnership = function(req,res,next){
    if (req.isAuthenticated()) {
        //check logged in user to author
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
                //checking ownership
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("errror","You have to login first!")
        res.redirect("back");
    }
}

//checks logged in state
middlewareObj.isLoggedIn =  function(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You have to login first!");
        res.redirect("/login");
    }
}

//returns logged in users' campgrounds
middlewareObj.userCampgrounds = function(req,res,next){
    if (req.isAuthenticated()) {
        //check logged in user to author
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error","Campground not found")
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();   
                } else {
                    req.flash("error", "Permission Denied!")
                    res.redirect("back");
                }                    
            }
        });
    } else {
        req.flash("error","You have to login first!")
        res.redirect("back");
    }
}

module.exports = middlewareObj;
