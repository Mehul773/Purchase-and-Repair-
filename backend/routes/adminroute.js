const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const us = await Admin.findOne({ email });
    if (!us) {
      const user = new Admin({
        name,
        email,
        password,
      });
      await user.save();
      res.json({ message: "Signup successful" });
    }
    if (us) {
      res.json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    } else {
      res.status(200).json({ message: "Successfully logged in" });
    }
    // if email and password match, log the user in and return a token
    // req.session.user=user.email;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: 'Error while logging in' });
  }
});

module.exports = router;
