const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const PORT           = process.env.PORT || 3000;

mongoose.set("useUnifiedTopology",true);
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("campground", campgroundSchema);

Campground.findByIdAndUpdate('5e7661222f5fac28dc8b327f',function(err,foundcamp){
    foundcamp.image = "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80";

});


//home page route
app.get("/",function(req,res){
    res.render("landing");
});

//INDEX - campground route
app.get("/campgrounds",function(req,res){
    //get array from mongodb
    Campground.find({},function(err,allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index",{campgrounds:allCampgrounds});
        }
    });

    // res.render("campgrounds",{campgrounds:campgrounds});
});


//NEW
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

//CREATE
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/:id", function(req, res){
    //find
    Campground.findById(req.params.id, function(err,foundCamphround){
        if (err) {
            console.log(err);
        } else {
            //render
            res.render("show", {campground: foundCamphround});
        }
    });
    req.params.id
});

app.listen(PORT,()=>{
	console.log("server started")
});




