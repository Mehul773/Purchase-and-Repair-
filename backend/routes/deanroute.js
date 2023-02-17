const express = require("express");
const router = express.Router();
const Dean = require("../models/deanModel");
const { protect } = require("../middleware/authMiddleware");

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

module.exports = router;
