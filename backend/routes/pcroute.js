const express = require("express");
const router = express.Router();
const PurchaseCoordinator = require("../models/pcModel");
const { protectPc } = require("../middleware/authPurchaseController");
// ============================================================
const multer = require("multer"); // is a MIDDLEWARE to handle form-data
const fs = require("fs"); // its File System to work with file on our system
const path = require("path"); // to join paths of file and directories

const {
  loginPc,
  registerPc,
  getAllPending,
  makeActive,
  logoutPc,
  getPcInfo,
  deletePc,
  getdept,
  addSupplier,
  getSupplier,
  delSupplier,
  uploadFile,
  downloadfile,
  uploadRepairFile,
  downloadrepairfile,
  getpurchase,
  getrepair,
  formpurchase,
} = require("../controller/pcController");

router.post("/signup", registerPc);
router.post("/login", loginPc);
router.post("/req", getAllPending);
router.post("/status", makeActive);
router.get("/dashboard", protectPc, (req, res) => {
  res.json({ message: "Authorized" });
});
router.get("/logout", logoutPc);
router.get("/getme", protectPc, getPcInfo);
router.post("/delete", deletePc);
router.get("/getdept", getdept);
router.post("/addsupp", addSupplier);
router.get("/getsupp", getSupplier);
router.post("/deletesupp", delSupplier);

router.get("/getpurchase", getpurchase);
router.get("/getrepair", getrepair);

router.post("/formpurchase",formpurchase)
// ===============================================================================
// upload purchase file 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //providing destination to store file
    // console.log(process.cwd()); 

    if (!fs.existsSync("public")) {
      //if public folder in file system exist ?
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/files")) {
      fs.mkdirSync("public/files");
    }

    cb(null, "public/files");
  },
  filename: function (req, file, cb) {
    /* console.log(file); */
    cb(null, Date.now() + file.originalname); //assigning unique filename
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname); //checking for extention to be .xlsx
    if (ext != ".xlsx") {
      return cb(new Error("Only .xlsx are allowed"));
    }

    cb(null, true);
  },
});

router.post(
  "/uploadfile",//For upload purchase file
  upload.fields([
    //upload.fiels and not uploads.single because we wanted to upload multiple file at once
    {
      name: "uploads", //uploads is the name of our key field in postman
      maxCount: 5,
    },
  ]),
  uploadFile
);
//----------------------------------------------------------------
// download purchase file 
router.get("/downloadfile", downloadfile);//For download repair file

//========================================================================
// Upload repair file 
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    //providing destination to store file
    // console.log(process.cwd()); 

    if (!fs.existsSync("public")) {
      //if public folder in file system exist ?
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/files")) {
      fs.mkdirSync("public/files");
    }

    cb(null, "public/files");
  },
  filename: function (req, file, cb) {
    /* console.log(file); */
    cb(null, Date.now() + file.originalname); //assigning unique filename
  },
});

const upload1 = multer({
  storage: storage1,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname); //checking for extention to be .xlsx
    if (ext != ".xlsx") {
      return cb(new Error("Only .xlsx are allowed"));
    }

    cb(null, true);
  },
});

router.post(
  "/uploadrepairfile",
  upload1.fields([
    //upload.fiels and not uploads.single because we wanted to upload multiple file at once
    {
      name: "uploads", //uploads is the name of our key field in postman
      maxCount: 5,
    },
  ]),
  uploadRepairFile
);

//----------------------------------------------------------------
// download repair  file 
router.get("/downloadrepairfile", downloadrepairfile);


module.exports = router;
