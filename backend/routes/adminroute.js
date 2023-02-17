const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");

const { loginAdmin, registerAdmin } = require("../controller/adminController");

router.post("/login", loginAdmin);
router.post("/signup", registerAdmin);

module.exports = router;
