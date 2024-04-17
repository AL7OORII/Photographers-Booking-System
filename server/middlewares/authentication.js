const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(500);
    // return new Error("Authentication invalid");
    return next(Error("Authentication invalid"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role == "photographer") {
      req.photographer = {
        photographerId: payload.photographerID,
        role: payload.role,
      };
    } else {
      req.client = { clientId: payload.clientID, role: payload.role };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication
