
const mongoose = require("mongoose");
var validator = require("email-validator");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
  },

  email: {
    type: String,
    unique : true,
    validate: {
      validator: (value) => validator.validate(value),
      message: "Invalid Email Address",
    },
  },
  phon: {
    type: String,
    minLength: 10,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    enum: ["s_admin", "admin", "user"],
    default: "user",
  },
});

const AuthModel = mongoose.model("authentication", authSchema);

module.exports = AuthModel;
