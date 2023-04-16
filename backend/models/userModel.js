const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your mame"],
    minlength: [3, "Name should have more than 3 characters "],
    maxlength: [30, "Name should not have more than 30 characters "],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email is already exist"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should be greater than 8 characters "],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Schema Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("isModified__1");
    next();
    console.log("isModified__2");
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// User Schema Methods
// for generating token when user register or login
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Create User Model
const User = new mongoose.model("User", userSchema);
module.exports = User;
