const express = require("express");
const router = express.Router();
const Hod = require("../models/hodModel");

const { loginHod, registerHod } = require("../controller/hodController");

router.post("/signup", registerHod);
router.post("/login", loginHod);

module.exports = router;
