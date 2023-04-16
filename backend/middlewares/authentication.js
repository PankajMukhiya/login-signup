const jwt = require("jsonwebtoken");

const tryCatchAsyncError = require("./tryCatchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = tryCatchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    // console.log("Token not present in Cookies");
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  // Verifying the user using token and jwt secret key
  const tokenDecodedData = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenDecodedData.id;
  req.user = await User.findById(userId);
  // and lastly call the next middleware function
  next();
});
