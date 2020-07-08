const express    = require("express");
const Campground = require("../models/campgrounds");
const { findByIdAndUpdate } = require("../models/comment");
const router     = express.Router();
const middleware = require("../middleware");


//INDEX - campground route
router.get("/",function(req,res){    
    //get array from mongodb
    Campground.find({},function(err,allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});            
        }
    });

    // res.render("campgrounds",{campgrounds:campgrounds});
});


//NEW
router.get("/new",  middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//CREATE
router.post("/", middleware.isLoggedIn,function(req,res){
    //get data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = {name: name,image :image,description :description ,author:author};

    //CREATE a new campground and submit to db
    Campground.create(newCampground,function(err,newSubmition){
        if (err) {
            console.log(err);            
        } else {
            //redirect to campground
            res.redirect("/campgrounds");            
        }
    });

});

//SHOW
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT 
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground});
        });
});

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.camp ,function(err,updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
});

//DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership ,async(req, res) => {
    try {
      let foundCampground = await Campground.findById(req.params.id);
      await foundCampground.remove();
      res.redirect("/campgrounds");
    } catch (error) {
      console.log(error.message);
      res.redirect("/campgrounds");
    }
});

module.exports = router;