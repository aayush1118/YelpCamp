const mongoose = require("mongoose");
const passportLocalMongoose =require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    Password: String,

    userCampgrounds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campground"
        }
    ],

    userProfileImg: {type:String, default: '/png/user.png'},
    
    date: {type: Date, default:Date.now}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);