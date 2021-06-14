const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./api/routes/user.js");
const interviewRoutes = require("./api/routes/interview.js");

// CORS headers Addition
app.use(cors());

// parsing json bodies
app.use(express.json());

// parsing all url encoded data
app.use(express.urlencoded({ extended: false }));

// imported routes
app.use("/api/users", userRoutes);
app.use("/api/interviews", interviewRoutes);

// last route used if invalid route is reached
app.use((req, res, next) => {
  const error = new Error("Invalid Route!");
  error.status = 404;
  // forward to error handling route
  next(error);
});

// route for handling all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
