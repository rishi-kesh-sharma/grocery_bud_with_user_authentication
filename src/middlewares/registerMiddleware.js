const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const registerMiddleware = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    //    checking if the email exists

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      res.status(400).send("email already exists");
      return;
    }

    // checking if the password matches
    if (password !== confirmPassword) {
      res.status(400).send("password not matching");
      return;
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // saving the data to database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).redirect("/login");
    return;
  } catch (err) {
    res.status(500).send("cannot register try again");
    console.log(err);
  }
};

module.exports = registerMiddleware;
