const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const { estimatedDocumentCount } = require("./review");


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true

    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);


// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     googleId: String,
//     facebookId: String
// });

// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", userSchema);
