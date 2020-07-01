const express    = require("express");
const Campground = require("../models/campgrounds");
const Comment    = require("../models/comment");
const { merge } = require("./campgrounds");
const router     = express.Router({mergeParams:true});

// --------------------------------------------------------------------------------------------------------------------
router.get("/new", isLoggedIn , function(req,res){
    //find campground
    Campground.findById(req.params.id, function(err,campground){
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground : campground});
        }
    });
});


router.post("/",isLoggedIn , function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                campground.comments.push(comment);
                campground.save();
                res.redirect('/campgrounds/' + campground._id);
            }
         });
        }
    });
});

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;