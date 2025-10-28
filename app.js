if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");  // ✅ corrected variable name
const userRouter = require("./routes/user.js");
const { date } = require("joi");


const dbUrl = process.env.ATLASDB_URL;

// MongoDB Connection
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => console.log("✅ Connected to DB"))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
            secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () =>{
    console.log("ERRRO IN MONGO SESSION STORE", err);
})

const sessionOption = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;  // ✅ Add this line
    next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});



// ✅ Mount Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ✅ 404 Handler
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// ✅ Error Handler
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong!";
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
    console.log("🚀 Server is listening on port 8080");
});
