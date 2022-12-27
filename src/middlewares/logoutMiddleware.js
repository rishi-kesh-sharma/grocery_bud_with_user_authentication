const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const logoutMiddleware = async (req, res, next) => {
  res.cookie("jwttoken", null).redirect("/login");

  next();
};
module.exports = logoutMiddleware;
