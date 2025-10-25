const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// ------------------ All Listings & Create Listing ------------------
router.route("/")
.get(wrapAsync(listingController.index)) // Show all listings
.post(isLoggedIn,  upload.single("listing[image]"), validateListing, 
 
  wrapAsync(listingController.createListing)); // Create new listing

// ------------------ New Listing Form ------------------
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ------------------ Show Single Listing, Update Listing, Delete Listing ------------------
router.route("/:id")
  .get(wrapAsync(listingController.showlisting))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));




// ------------------ Edit Listing Form ------------------
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;

