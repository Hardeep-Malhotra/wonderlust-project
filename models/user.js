// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");
// const { estimatedDocumentCount } = require("./review");


// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
       

//     }
// })

// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"], // Error message agar empty ho
    unique: true, // Ek email se ek hi account
    lowercase: true, // Email hamesha small letters mein save hoga
    trim: true, // Faltu ki spaces (aage/piche) hata dega
    // Ye Regex (Regular Expression) check karega ki format sahi hai ya nahi
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please fill a valid email address",
    ],
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

