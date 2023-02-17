const express = require("express");
const router = express.Router();
const PurchaseCoordinator = require("../models/pcModel");

const {
  loginPc,
  registerPc,
  getAllPending,
  makeActive,
} = require("../controller/pcController");

router.post("/signup", registerPc);
router.post("/login", loginPc);
router.post("/req", getAllPending);
router.post("/status", makeActive);

module.exports = router;

// Signup route
/* router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const us = await PurchaseCoordinator.findOne({ email });
    if (!us) {
      const user = new PurchaseCoordinator({
        name,
        email,
        password,
        department,
        status: "Pending",
      });
      await user.save();
      res.json({ message: "Signup request to admin is sent", email: us.email });
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

    const user = await PurchaseCoordinator.findOne({ email });

    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    } else if (user.status === "Pending") {
      res.json({ message: "Pending Status" });
    } else if (user.status === "Active") {
      res.status(200).json({ message: "Successfully logged in" });
    }
    // if email and password match, log the user in and return a token
    // req.session.user=user.email;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: 'Error while logging in' });
  }
});

router.post("/req", async (req, res) => {
  try {
    const { status } = req.body;

    const pcs = await PurchaseCoordinator.find({ status });
    if (!pcs) {
      res.json({ message: "No pending Pc" });
    } else {
      res.json({ message: "Pc Details", pcs: pcs });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/status", async (req, res) => {
  try {
    const { email } = req.body;

    PurchaseCoordinator.findOne({ email }, (err, pc) => {
      if (err) return res.status(500).send(err);

      if (pc.status === "Pending") {
        pc.status = "Active";
      }

      pc.save((err, pcs) => {
        if (err) return res.status(500).send(err);
        res.send(pcs);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/check", async (req, res) => {
  try {
    const { email } = req.body;

    PurchaseCoordinator.findOne({ email }, (err, pc) => {
      if (err) return res.status(500).send(err);

      if (pc.status === "Pending") {
        pc.status = "Active";
      }

      pc.save((err, pcs) => {
        if (err) return res.status(500).send(err);
        res.send(pcs);
      });
    });
  } catch (error) {
    console.log(error);
  }
});
 */
module.exports = router;
