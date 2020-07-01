const Campground = require("../models/campgrounds");
const Comment = require("../models/comment");
const middlewareObj = {};

//checks logged in user to campgrounds
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if (req.isAuthenticated()) {
        //check logged in user to author
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();   
                } else {
                    res.redirect("back");
                }                    
            }
        });
    } else {
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
        res.redirect("back");
    }
}

//checks logged in state
middlewareObj.isLoggedIn =  function(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = middlewareObj;
