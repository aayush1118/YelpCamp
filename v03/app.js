const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const Campground     = require("./models/campgrounds");
const seedDb         = require("./seeds");
const Comment        = require("./models/comment");
const PORT           = process.env.PORT || 3000;


mongoose.set("useUnifiedTopology",true);
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

seedDb();




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
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });

    // res.render("campgrounds",{campgrounds:campgrounds});
});


//NEW
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
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
// --------------------------------------------------------------------------------------------------------------------
app.get("/campgrounds/:id/comments/new", function(req,res){
    //find campground
    Campground.findById(req.params.id, function(err,campground){
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground : campground});
        }
    });
});


app.post("/campgrounds/:id/comments", function(req, res){
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


app.listen(PORT,()=>{
	console.log("server started")
});