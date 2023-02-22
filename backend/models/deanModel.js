const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

var createdAt = function () {
  var d = new Date();
  var formattedDate = moment(d).format("MM-DD-YYYY, h:mm:ss a");
  return formattedDate;
};

const deanSchema = mongoose.Schema({
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

  status: {
    type: String,
    require: true,
  },

  token: {
    type: String,
  },

  createdAt: {
    type: String,
    default: createdAt,
  },
});

deanSchema.methods.generateAuthToken = async function () {
  try {
    const token_final = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SECRET
    );
    this.token = token_final;
    await this.save();
    return token_final;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("Dean", deanSchema);
