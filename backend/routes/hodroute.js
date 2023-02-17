const express = require("express");
const router = express.Router();
const Hod = require("../models/hodModel");

const {
  loginHod,
  registerHod,
  getAllPending,
  makeActive,
} = require("../controller/hodController");

router.post("/signup", registerHod);
router.post("/login", loginHod);
router.post("/req", getAllPending);
router.post("/status", makeActive);

module.exports = router;
