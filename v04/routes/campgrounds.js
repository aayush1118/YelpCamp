const express    = require("express");
const Campground = require("../models/campgrounds");
const router     = express.Router();


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
router.get("/new",function(req,res){
    res.render("campgrounds/new");
});

//CREATE
router.post("/",function(req,res){
    //get data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name,image :image,description :description};
    //create a new campground and submit to db
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

module.exports = router;