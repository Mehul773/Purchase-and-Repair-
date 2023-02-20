const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Dean = require("../models/deanModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwtokendean;

    console.log(`Token is :   ${token}`);

    /*     console.log(`Middleware ${token}`); */
    const verify_token = jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        console.log(err);
      }
    });
    /*     console.log(`Verified ${verify_token.username}`); */
    console.log(verify_token);

    const root_user = await Dean.findOne({
      _id: verify_token.username,
      "tokens.token": token,
    });

    req.token = token;
    req.root_user = root_user;
    req.user_id = root_user._id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed! Invalid token." });
    console.log(error);
  }
});

module.exports = { protect };
