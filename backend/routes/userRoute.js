const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authentication");
const {
  register,
  logIn,
  getProfile,
  updateProfile,
  logOut,
  updatePassword,
} = require("../controllers/userController");

// Create Router
const router = express.Router();

//creating User Route
router.route("/register").post(register);
router.route("/login").post(logIn);
router
  .route("/profile")
  .get(isAuthenticatedUser, getProfile)
  .put(isAuthenticatedUser, updateProfile);
router
  .route("/profile/change-password")
  .put(isAuthenticatedUser, updatePassword);
router.route("/logout").get(logOut);

module.exports = router;
