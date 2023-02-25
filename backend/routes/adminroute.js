const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel");
const { protectAdmin } = require("../middleware/authAdmin");

const {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminInfo,
  addDepartment,
  getdept,
  delDept,
} = require("../controller/adminController");

router.post("/login", loginAdmin);
router.post("/signup", registerAdmin);
router.get("/dashboard", protectAdmin, (req, res) => {
  res.json({ message: "Authorized" });
});
router.get("/logout", logoutAdmin);
router.get("/getme", protectAdmin, getAdminInfo);
router.post("/adddept", protectAdmin, addDepartment);
router.get("/getdept", getdept);
router.post("/deletedept", delDept);


module.exports = router;
