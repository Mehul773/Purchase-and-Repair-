const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Hod = require("../models/hodModel");

const protectHod = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwtokenhod;

    const verify_token = jwt.verify(
      token,
      process.env.JWT_SECRET
      /* (err, verify_token) => {
        if (err) {
          console.log(err);
        }
        let root;
        Admin.findOne({
          _id: verify_token._id,
          token: token,
        }).then((root_user) => {
          req.token = token;
          req.user = root_user;
          root = root_user;
                  console.log(root);
        });
        console.log(root);
        next();
      } */
    );
    /*     console.log(verify_token._id); */
    root_user = await Hod.findOne({
      _id: verify_token._id,
      token: token,
    });
    req.user = root_user;
    next();
    /*     console.log(`Verified ${verify_token.username}`); */
  } catch (error) {
    res.status(401).json({ message: "Authentication failed! Invalid token." });
    console.log(error);
  }
});

module.exports = { protectHod };
