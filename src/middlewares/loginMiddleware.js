const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailExists = await User.findOne({ email: email });
    if (!emailExists) {
      res.status(400).send("creditials not matching");
      return;
    } else {
      const hasPasswordMatched = bcrypt.compare(password, emailExists.password);
      if (!hasPasswordMatched) {
        res.send("credentials not matching");
        return;
      }
      req.user = emailExists;
    }
  } catch (err) {
    res.status(500).send("login failed try again");
    return;
  }

  next();
};
module.exports = loginMiddleware;
