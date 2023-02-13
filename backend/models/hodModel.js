const mongoose = require("mongoose");

const hodSchema = mongoose.Schema(
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

    department: {
      type: String,
      required: [true, "Please add department"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Hod", hodSchema);
