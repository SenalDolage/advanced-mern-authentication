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
    sendTokenResponse(user, 201, res);
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
          sendTokenResponse(user, 200, res);
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

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${process.env.RESET_PWD_URI}/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1> 
    <p>Please go to this link to reset your password</p> 
    <a href=${resetUrl} clicktracking=off>Click here to reset.</a>
    `;

    try {
      
    } catch (error) {

    }
  } catch (error) {
    next(new ErrorResponse(error.message || "User not found", 500));
  }
};

exports.resetpassword = (req, res, next) => {
  res.send("resetpassword route");
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    sucess: true,
    token,
  });
};
