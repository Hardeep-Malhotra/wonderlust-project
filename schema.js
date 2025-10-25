
// const Joi = require('joi');

// // Listing schema
// module.exports.listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required().messages({ "string.empty": "Title is required" }),
//     description: Joi.string().required().messages({ "string.empty": "Description is required" }),
//     country: Joi.string().required().messages({ "string.empty": "Country is required" }),
//     location: Joi.string().required().messages({ "string.empty": "Location is required" }),
//     price: Joi.number().required().min(0).messages({
//       "number.base": "Price must be a number",
//       "any.required": "Price is required",
//       "number.min": "Price cannot be negative"
//     }),
//     lat: Joi.number().required(),
//     lng: Joi.number().required(),
//     image: Joi.object({ url: Joi.string().allow("", null) }).optional()
//   }).required()
// });

// // Review schema

const Joi = require('joi');

// Listing schema
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({ "string.empty": "Title is required" }),
    description: Joi.string().required().messages({ "string.empty": "Description is required" }),
    country: Joi.string().required().messages({ "string.empty": "Country is required" }),
    location: Joi.string().required().messages({ "string.empty": "Location is required" }),
    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number",
      "any.required": "Price is required",
      "number.min": "Price cannot be negative"
    }),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    category: Joi.string().required().valid(
      "Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools",
      "Camping","Tropical","Lakefront","Relaxation","Arctic","Pet Friendly",
      "Urban","Beachfront","Historical","Tiny Homes","Art & Culture","Stargazing",
      "Skiing","Luxury"
    ).messages({ "any.required": "Category is required", "any.only": "Invalid category selected" }),
    image: Joi.object({ url: Joi.string().allow("", null) }).optional()
  }).required()
});
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});
