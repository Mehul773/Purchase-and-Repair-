const express = require("express");
const router = express.Router();
const Hod = require("../models/hodModel");
const { protectHod } = require("../middleware/authHod");

const {
  loginHod,
  registerHod,
  getAllPending,
  makeActive,
  logoutHod,
  getHodInfo,
  deleteHod,
  getdept,
  getrepair,
  getpurchase,
  downloadfile,
  downloadrepairfile,
} = require("../controller/hodController");

router.post("/signup", registerHod);
router.post("/login", loginHod);
router.post("/req", getAllPending);
router.post("/status", makeActive);
router.get("/dashboard", protectHod, (req, res) => {
  res.json({ message: "Authorized" });
});
router.get("/logout", logoutHod);
router.get("/getme", protectHod, getHodInfo);
router.post("/delete", deleteHod);
router.get("/getdept", getdept);

router.get("/getpurchase", getpurchase);
router.get("/getrepair", getrepair);

router.get("/downloadfile", downloadfile);
router.get("/downloadrepairfile", downloadrepairfile);
module.exports = router;
