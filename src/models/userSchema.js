const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  token: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
