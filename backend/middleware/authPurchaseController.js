const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const PurchaseController = require("../models/pcModel");

const protectPc = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwtokenpc;

    jwt.verify(token, process.env.JWT_SECRET, (err, verify_token) => {
      if (err) {
        console.log(err);
      }

      const root_user = PurchaseController.findOne({
        _id: verify_token._id,
        "tokens.token": token,
      });

      req.token = token;
      req.root_user = root_user;
      req.user_id = root_user._id;

      next();
    });
    /*     console.log(`Verified ${verify_token.username}`); */
  } catch (error) {
    res.status(401).json({ message: "Authentication failed! Invalid token." });
    console.log(error);
  }
});

module.exports = { protectPc };
