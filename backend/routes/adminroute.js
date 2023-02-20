const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");
const { protectAdmin } = require("../middleware/authAdmin");

const { loginAdmin, registerAdmin } = require("../controller/adminController");

router.post("/login", loginAdmin);
router.post("/signup", registerAdmin);
router.get("/dashboard", protectAdmin, (req, res) => {
  res.json({ message: "Authorized" });
});

module.exports = router;
