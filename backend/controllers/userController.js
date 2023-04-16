const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const tryCatchAsyncError = require("../middlewares/tryCatchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// User Register
exports.register = tryCatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!email || !name || !password) {
    return next(new ErrorHandler("Please enter all the fields", 400));
  }

  const user = await User.create({ name, email, password });
  generateToken(user, 201, res);
  console.log("User register successfully");
});

// User Login
exports.logIn = tryCatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invailid email", 400));
  }

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    return next(new ErrorHandler("Invailid password", 400));
  }

  generateToken(user, 200, res);
  console.log("User login successfully");
});

// User Profile Access
exports.getProfile = tryCatchAsyncError(async (req, res, next) => {
  // const { id, name, email, password } = req.user;

  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
  console.log("Profile Accessed");
});

// User Profile Edit
exports.updateProfile = async (req, res, next) => {
  const { name, email } = req.body;

  const newUserData = {
    name,
    email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // console.log(user);
  res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });

  console.log("Profile updated successfully");
};

// User Profile Password Edit
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const { oldPassword, newPassword, confirmPassword } = req.body;

  console.log(newPassword ,confirmPassword);
  // Comparing password present in database and old password
  const comparedPassword = await bcrypt.compare(oldPassword, user.password);
  if (!comparedPassword) {
    return next(new ErrorHandler("Old password is Incorrect", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Confirm password does not  matched", 400));
  }

  user.password = confirmPassword;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });

  console.log("Password updated successfully");
};

// User Logout
exports.logOut = async (req, res, next) => {
  const { token } = req.cookies;

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });

  !token
    ? console.log("Logout Already Done")
    : console.log("Logout Successfully");
};
