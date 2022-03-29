const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // duplicate error key code for mongoose
  if (err.code === 11000) {
    error = new ErrorResponse("Duplicate field value", 400);
  }

  // mongoose Validation Error
  if (err.name === "Validation Error") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    error: error || "Server Error",
  });
};

module.exports = errorHandler;
