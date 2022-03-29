const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      sucess: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({ email }).select("+password");

      if (user) {
        const isMatch = await user.matchPassword(password);
        if (isMatch) {
          res.status(200).json({
            sucess: true,
            token: "fdsdds",
          });
        }
      } else {
        next(new ErrorResponse("User not found", 401));
      }
    } catch (error) {
      next(new ErrorResponse(error.message || "User not found", 500));
    }
  } else {
    next(new ErrorResponse("Please provide email and password", 400));
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("forgotpassword route");
};

exports.resetpassword = (req, res, next) => {
  res.send("resetpassword route");
};
