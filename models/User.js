const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    address: {
      type: String,
      default: "Addis Ababa",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
