const express = require("express");
const router = express.Router();
const Dean = require("../models/deanModel");
const { protectDean } = require("../middleware/authDean");

const {
  loginDean,
  registerDean,
  getAllPending,
  makeActive,
  logoutDean,
  getDeanInfo,
  deleteDean,
  downloadfile,
  downloadrepairfile,
  getrepair,
  getpurchase,
} = require("../controller/deanController");

router.post("/login", loginDean);
router.post("/signup", registerDean);
router.post("/req", getAllPending);
router.post("/status", makeActive);
router.get("/dashboard", protectDean, (req, res) => {
  res.json({ message: "Authorized" });
});
router.get("/logout", logoutDean);
router.get("/getme", protectDean, getDeanInfo);
router.post("/delete", deleteDean);
router.get("/downloadfile", downloadfile);
router.get("/downloadrepairfile", downloadrepairfile);
router.get("/getpurchase", getpurchase);
router.get("/getrepair", getrepair);

module.exports = router;
