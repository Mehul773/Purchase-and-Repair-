const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

    status: {
      type: String,
      require: true,
    },
    
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);

deanSchema.methods.generateAuthToken = async function () {
  try {
    const token_final = jwt.sign(
      { username: this._id.toString() },
      process.env.JWT_SECRET
    );
    this.tokens = this.tokens.concat({ token: token_final });
    console.log(`Token final ${token_final}`);
    await this.save();
    return token_final;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("Dean", deanSchema);
