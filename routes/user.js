const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const { saveRedirectUrl } = require("../middleware.js");
const userContoller = require("../controllers/users.js");

// ---------------- SIGNUP ----------------
router.route("/signup")
  .get(userContoller.renderSignupForm)
  .post(wrapAsync(userContoller.signup));

// ---------------- LOGIN ----------------
router.route("/login")
  .get(userContoller.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userContoller.login
  );

// ---------------- LOGOUT ----------------
router.get("/logout", userContoller.logout);

module.exports = router;
