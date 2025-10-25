

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  lat: Number,
  lng: Number,
  category: {
    type: String,
    enum: [
      "Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools",
      "Camping","Tropical","Lakefront","Relaxation","Arctic","Pet Friendly",
      "Urban","Beachfront","Historical","Tiny Homes","Art & Culture","Stargazing",
      "Skiing","Luxury"
    ],
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

// Delete associated reviews on listing deletion
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    console.log(`Listing deleted: ${listing._id}`);
    const result = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(`Deleted ${result.deletedCount} reviews associated with this listing.`);
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
