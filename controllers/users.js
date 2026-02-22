// const User =  require("../models/user");



// module.exports.renderSignupForm = (req, res) => {
//     res.render("users/signup");
// };


// module.exports.signup = async (req, res, next) => {
//     try {
//         const { username, email, password } = req.body;

//         // 1️⃣ Check if username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             req.flash("error", "This username is already taken. Please login.");
//             return res.redirect("/login"); // redirect to login page
//         }

//         // 2️⃣ Check if email already exists
//         const existingEmail = await User.findOne({ email });
//         if (existingEmail) {
//             req.flash("error", "This email is already registered. Please login.");
//             return res.redirect("/login");
//         }

//         // 3️⃣ Create a new user
//         const newUser = new User({ username, email });
//         const registeredUser = await User.register(newUser, password);

//         // 4️⃣ Auto-login the user
//         req.login(registeredUser, (err) => {
//             if (err) return next(err);
//             req.flash("success", `Welcome ${registeredUser.username}! You are now logged in.`);
//             res.redirect("/listings");
//         });

//     } catch (e) {
//         console.log("Signup Error:", e);  // log the error in server console
//         req.flash("error", "Something went wrong during signup: " + e.message);
//         res.redirect("/signup");
//     }
// };


// module.exports.renderLoginForm = (req, res) => {
//     res.render("users/login");
// };

// module.exports.login = async (req, res) => {
//     req.flash("success", "Welcome back to Wonderlust");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// };
// module.exports.logout = (req, res, next) => {
//     req.logout(err => {
//         if (err) return next(err);
//         req.flash("success", "You have successfully logged out!");
//         res.redirect("/login");
//     });
// };






const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        // Validate that username is not empty or composed only of whitespace
        if (!username || username.trim().length === 0) {
            req.flash("error", "Username cannot be empty or contain only spaces!");
            return res.redirect("/signup");
        }

        // Sanitize input by trimming leading and trailing whitespace
        username = username.trim(); 

        // 1️⃣ Verify if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash("error", "This username is already taken. Please login.");
            return res.redirect("/login");
        }

        // 2️⃣ Verify if the email address is already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            req.flash("error", "This email is already registered. Please login.");
            return res.redirect("/login");
        }

        // 3️⃣ Initialize and register the new user with Passport-Local-Mongoose
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        // 4️⃣ Establish a login session for the newly registered user
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome ${registeredUser.username}! You are now logged in.`);
            res.redirect("/listings");
        });

    } catch (e) {
        console.error("Signup Error:", e); // Detailed server-side logging
        req.flash("error", "An error occurred during signup: " + e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wonderlust!");
    // Redirect to the intended page or default to listings
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash("success", "You have successfully logged out!");
        res.redirect("/login");
    });
};
