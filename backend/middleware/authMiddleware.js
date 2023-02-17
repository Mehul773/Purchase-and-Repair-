const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Dean = require("../models/deanModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwtokendean;

    console.log(`Middleware ${token}`);
    const verify_token = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Verified ${verify_token.username}`);

    const root_user = await Dean.findOne({
      _id: verify_token.username,
      "tokens.token": token,
    });

    if (!root_user) {
      throw new Error("user not found");
    }
    req.token = token;
    req.root_user = root_user;
    req.user_id = root_user._id;
    next();
  } catch (error) {
    res.status(401).send("unauthorized....");
    console.log(error);
  }
});

module.exports = { protect };
