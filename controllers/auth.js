const User = require("../models/User");

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
    res.status(500).json({
      sucess: false,
      error: error,
    });
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
        res.status(404).json({
          sucess: false,
          error: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        sucess: false,
        error: error,
      });
    }
  } else {
    res.status(500).json({
      sucess: false,
      error: "Please provide email and password",
    });
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("forgotpassword route");
};

exports.resetpassword = (req, res, next) => {
  res.send("resetpassword route");
};
