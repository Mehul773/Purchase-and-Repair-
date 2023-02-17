const express = require("express");
const router = express.Router();
const Dean = require("../models/deanModel");
const { protect } = require("../middleware/authMiddleware");

const {
  loginDean,
  registerDean,
  getDean,
} = require("../controller/deanController");

router.post("/login", loginDean);
router.post("/signup", registerDean);
router.get("/dashboard", protect, getDean);

module.exports = router;
