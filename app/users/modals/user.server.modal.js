const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    // use min, max if type is Number/Date
    minlength: 3,
    maxlength: 255,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  displayName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    default: "",
    required: true,
    index: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  role: {
    type: String,
    trim: true,
    required: true,
    default: "student",
  },
  password: {
    type: String,
    required: true,
    default: "",
    select: false,
    minlength: 8,
    maxlength: 1024,
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

// console.log("---", UserSchema.path("email"));

module.exports = mongoose.model("User", UserSchema);
