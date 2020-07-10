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
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);