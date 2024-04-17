const errorHandler = async (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = ` ${Object.keys(err.keyValue)} is taken`;
    if (Object.keys(err.keyValue)[0] === "email") {
      customError.message = "Email already exists";
      customError.statusCode = 400;
    }
    if (Object.keys(err.keyValue)[0] === "phone_Number") {
      customError.message = "Phone number is taken";
      customError.statusCode = 400;
    }
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.message = `No User found with id : ${err.value._id}`;
    customError.statusCode = 404;
  }

  if (err.name === "CastError" && err.path === "commentId") {
    customError.message = `No comment found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandler;
