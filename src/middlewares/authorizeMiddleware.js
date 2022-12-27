const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const authorizeMiddleware = async (req, res, next) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const cookie = req.cookies.jwttoken;
  try {
    if (!cookie) {
      return res.status(401).redirect("/login");
    }

    const { _id } = await jwt.verify(cookie, JWT_SECRET_KEY);

    if (!_id) {
      return res.status(401).redirect("/login");
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).redirect("/login");
    }
    req.user = user;
  } catch (err) {
    res.status(500).send("cannot access try again");
  }

  next();
};
module.exports = authorizeMiddleware;
