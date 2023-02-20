const express = require("express");
const router = express.Router();
const PurchaseCoordinator = require("../models/pcModel");
const { protectPc } = require("../middleware/authPurchaseController");

const {
  loginPc,
  registerPc,
  getAllPending,
  makeActive,
} = require("../controller/pcController");

router.post("/signup", registerPc);
router.post("/login", loginPc);
router.post("/req", getAllPending);
router.post("/status", makeActive);
router.get("/dashboard", protectPc, (req, res) => {
  res.json({ message: "Authorized" });
});

module.exports = router;
