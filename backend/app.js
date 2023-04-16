const express = require("express");
const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Dotenv
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Use Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json()); // not used body parserser becoz express v4 already implemented it
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use Router
app.use("/api", userRoute);

// Sending Static Path When the Project is in Production Mode
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Home Page
app.get("/", (req, res, next) => {
  res.send("Namste World! from the server side");
});

// Middleware
app.use(errorMiddleware);

module.exports = app;
