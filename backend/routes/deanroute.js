const express = require("express");
const router = express.Router();
const Dean = require("../models/deanModel");
const { protectDean } = require("../middleware/authDean");

const {
  loginDean,
  registerDean,
  getAllPending,
  makeActive,
} = require("../controller/deanController");

router.post("/login", loginDean);
router.post("/signup", registerDean);
router.post("/req", getAllPending);
router.post("/status", makeActive);
router.get("/dashboard", protectDean, (req, res) => {
  res.json({ message: "Authorized" });
});

module.exports = router;
