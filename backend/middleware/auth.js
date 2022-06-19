const jwt = require("jsonwebtoken");

const config = require("../config/config.json");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.secret);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    throw error;
  }

  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  req.email = decodedToken.email;

  next();
};
