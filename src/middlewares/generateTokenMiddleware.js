const jwt = require("jsonwebtoken");
const generateTokenMiddleware = async (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;

  try {
    const token = await jwt.sign({ _id: req.user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });

    req.user.token.push(token);
    await req.user.save();
    res.status(200).cookie("jwttoken", token).redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateTokenMiddleware;
