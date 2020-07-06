const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    min: 3,
    max: 255,
  },
  lastName: {
    type: String,
    trim: true,
    min: 3,
    max: 255,
  },
  displayName: {
    type: String,
    min: 3,
    max: 255,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    default: "",
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  role: {
    type: String,
    trim: true,
    default: "student",
  },
  password: {
    type: String,
    default: "",
    select: false,
    min: 8,
    max: 1024,
  },
  salt: {
    type: String,
  },
  preferences: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userScheme);
