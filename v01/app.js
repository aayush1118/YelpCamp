const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=photo-of-pitched-dome-tents-overlooking-mountain-ranges-1687845.jpg&fm=jpg"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-surrounded-with-green-grass-field-1061640.jpg&fm=jpg"},
    {name: "Mountain Goat", image: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=photo-of-pitched-dome-tents-overlooking-mountain-ranges-1687845.jpg&fm=jpg"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-surrounded-with-green-grass-field-1061640.jpg&fm=jpg"},
    {name: "Mountain Goat", image: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=photo-of-pitched-dome-tents-overlooking-mountain-ranges-1687845.jpg&fm=jpg"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-surrounded-with-green-grass-field-1061640.jpg&fm=jpg"},
    {name: "Mountain Goat", image: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
];
//home page route
app.get("/",function(req,res){
    res.render("landing");
});

//campground route
app.get("/campgrounds",function(req,res){

    res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.post("/campgrounds",function(req,res){
    //get data
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name,image :image};
    campgrounds.push(newCampground);
    //redirect to campground
    res.redirect("/campgrounds");
});

app.listen(PORT,()=>{
	console.log("server started")
});