const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const flash          = require("connect-flash");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const methodOverride = require("method-override");

const Campground     = require("./models/campgrounds");
const seedDb         = require("./seeds");
const Comment        = require("./models/comment");
const User           = require("./models/user");

const commentRoutes    = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const authRoutes       = require("./routes/index");

const PORT           = process.env.PORT || 3000;


//server setup
mongoose.set("useUnifiedTopology",true);
mongoose.connect("mongodb://localhost/yelp_camp_v07",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.static('files'));
app.use(methodOverride("_method"));
app.use(flash());


// seedDb(); //empties dataBase


//passport-config
app.use(require("express-session")({
    secret:"aayush jain",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(PORT,()=>{
	console.log("server started")
});