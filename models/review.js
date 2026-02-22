
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reviewSchema = new Schema({
//     // username: {        
//     //     type: String,
//     //     required: true
//     // },
//     comment: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     }
// });

// module.exports = mongoose.model("Review", reviewSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Comment is required"], // Hindi se English
    trim: true,
    minlength: [3, "Comment must be at least 3 characters long"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must have an author"],
  },
});

module.exports = mongoose.model("Review", reviewSchema);
