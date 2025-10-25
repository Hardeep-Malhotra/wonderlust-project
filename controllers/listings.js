const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError"); // agar custom error use kar rahe ho

// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
// };
module.exports.index = async (req, res) => {
  try {
    const { search } = req.query;
    let allListings;

    if (search && search.trim() !== "") {
      // Agar search likha gaya hai to wahi location dikhayenge
      allListings = await Listing.find({
        location: { $regex: search, $options: "i" },
      });
    } else {
      // Agar kuch search nahi likha, to sabhi listings dikhayenge
      allListings = await Listing.find({});
    }

    res.render("listings/index", { allListings, search });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong while fetching listings.");
    res.redirect("/listings");
  }
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showlisting = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist.");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if (req.file) {
        newListing.image = { url: req.file.path, filename: req.file.filename };
    }
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    let originalImageUrl = listing.image ? listing.image.url.replace("/upload", "/upload/w_250") : '';
    res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    // Update fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.country = req.body.listing.country;
    listing.location = req.body.listing.location;

    listing.lat = req.body.listing.lat;
    listing.lng = req.body.listing.lng;
    listing.category = req.body.listing.category;

    // Update image only if new file uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
