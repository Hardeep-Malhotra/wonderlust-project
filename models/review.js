
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
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reviewSchema = new Schema({
//   comment: {
//     type: String,
//     required: [true, "Comment is required"], // Hindi se English
//     trim: true,
//     minlength: [3, "Comment must be at least 3 characters long"],
//   },
//   rating: {
//     type: Number,
//     required: [true, "Rating is required"],
//     min: 1,
//     max: 5,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   author: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: [true, "Review must have an author"],
//   },
// });

// module.exports = mongoose.model("Review", reviewSchema);

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: { type: String, trim: true },
  image: {
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?v=1", // Default image
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470?v=1"
          : v,
    },
    filename: String,
  },
  price: {
    type: Number,
    min: [0, "Price cannot be negative"],
    required: true,
  },
  location: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  category: {
    type: String,
    enum: {
      values: [
        "Trending",
        "Rooms",
        "Iconic Cities",
        "Mountains",
        "Castles",
        "Amazing Pools",
        "Camping",
        "Tropical",
        "Lakefront",
        "Relaxation",
        "Arctic",
        "Pet Friendly",
        "Urban",
        "Beachfront",
        "Historical",
        "Tiny Homes",
        "Art & Culture",
        "Stargazing",
        "Skiing",
        "Luxury",
      ],
      message: "{VALUE} is not a valid category",
    },
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

