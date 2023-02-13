const mongoose = require("mongoose");

const deanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Dean", deanSchema);
