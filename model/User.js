const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    maxLength: 25,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 25,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
