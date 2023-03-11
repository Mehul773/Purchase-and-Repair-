const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Pc = require("../models/pcModel");
const nodemailer = require("../config/nodemailer.config");
const Department = require("../models/departmentModel");
const Supplier = require("../models/supplierModel");
// ----------------------------------------------------------------
const Purchase = require("../models/purchaseModel");
const Recurring = require("../models/recurringModel");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

// const xlsx = require("node-xlsx");

const xlsx = require("xlsx");
const chmodr = require("chmodr");

const loginPc = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Pc.findOne({ email });

    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.status == "Pending") {
      res.json({ message: "Pending Status" });
    } else if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.status == "Active"
    ) {
      const token = await user.generateAuthToken();

      res.cookie("jwtokenpc", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        message: "Successfully logged in",
      });
    } else {
      res.json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
  }
};

//==========================================================

const registerPc = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const userExists = await Pc.findOne({ email });

    if (userExists) {
      res.json({ message: "User Already Exists" });
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User

    const user = await Pc.create({
      name,
      email,
      department,
      password: hashedPassword,
      status: "Pending",
    });

    if (user) {
      const token = await user.generateAuthToken();
      console.log(`Generated by signup ${token}`);

      await user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        console.log("E-mail information of user: ");

        console.log(user.name);
        console.log(user.email);
        console.log(user.token);

        nodemailer.sendConfirmationEmail(user.name, user.email, user.tokens);
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: token,
          message: "Successfully signed up",
        });
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPending = async (req, res) => {
  try {
    const { status } = req.body;

    const pcs = await Pc.find({ status });
    if (!pcs) {
      res.json({ message: "No pending Pc" });
    } else {
      res.json({ message: "Pc Details", pcs: pcs });
    }
  } catch (error) {
    console.log(error);
  }
};

const makeActive = async (req, res) => {
  try {
    const { email } = req.body;

    Pc.findOne({ email }, (err, pc) => {
      if (err) return res.status(500).send(err);

      if (pc.status === "Pending") {
        pc.status = "Active";
      }

      pc.save((err, pcs) => {
        if (err) return res.status(500).send(err);
        nodemailer.sendActivationEmail(pcs.name, pcs.email, pcs.tokens);
        res.send(pcs);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutPc = async (req, res) => {
  try {
    res.clearCookie("jwtokenpc", { path: "/" });
    res.status(200).send("user logout");
  } catch (error) {
    console.log(error);
  }
};

const getPcInfo = async (req, res) => {
  try {
    const { _id, name, department, email } = await Pc.findById(req.user._id);
    res.status(200).json({
      _id: _id,
      name: name,
      department: department,
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePc = async (req, res) => {
  try {
    const { email } = req.body;

    const pc = await Pc.findOne({ email });

    if (!pc) {
      res.status(400);
      console.log("Pc not found to be deleted");
    }
    nodemailer.sendDeclineEmail(pc.name, pc.email, pc.token);
    await pc.remove();

    return res.status(404).json({ message: "Pc deleted" });
  } catch (error) {
    console.log(error);
  }
};

const getdept = async (req, res) => {
  try {
    const depts = await Department.find();
    res.json({
      depts: depts,
    });
  } catch (error) {
    console.log(error);
  }
};

const addSupplier = async (req, res) => {
  try {
    const { supplier, address, contact } = req.body;

    await Supplier.create({
      supplier,
      address,
      contact,
    });

    res.json({ message: `Supplier added + ${supplier}` });
  } catch (error) {
    console.log(error);
  }
};

const getSupplier = async (req, res) => {
  try {
    const supp = await Supplier.find();
    res.json({
      supp: supp,
    });
  } catch (error) {
    console.log(error);
  }
};

const delSupplier = async (req, res) => {
  try {
    const { supplier } = req.body;
    const supp = await Supplier.findOne({ supplier });
    if (!supp) {
      return res.status(400).json({ message: "Supplier not found" });
    }
    await supp.remove();

    return res.status(404).json({ message: "supplier deleted" });
  } catch (error) {
    console.log(error);
  }
};

// ===========================================================================
// upload purchase file
const uploadFile = async (req, res) => {
  const files = [];
  try {
    if (Array.isArray(req.files.uploads) && req.files.uploads.length > 0) {
      //checking if req.files.uploads is array and it exist or not
      for (let file of req.files.uploads) {
        files.push(file); //pushing each file into files array
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "File Array not Uploaded" });
  }

  for (var k = 0; k < files.length; k++) {
    //loop to iterate through all files in files array
    console.log(files[k].filename);
    //for pushing json to database
    try {
      // console.log(process.cwd()); F:\mehul study\React\sdp project\Purchase and Repair
      const path1 = path.join(
        __dirname,
        "../../",
        "/public/files/" + files[k].filename
      );
      // console.log(path1); F:\mehul study\React\sdp project\Purchase and Repair\public\files\1677520009765new.xlsx
      let xlFile = xlsx.readFile(path1);
      let sheet = xlFile.Sheets[xlFile.SheetNames[0]];
      const P_JSON = xlsx.utils.sheet_to_json(sheet);
      try {
        await Purchase.insertMany(P_JSON);
        res.status(200).json({ message: "Data entered successfully" });
      } catch (error) {
        res.send({ message: "Duplicate key found" });
      }

      chmodr("./", 0o777, (err) => {
        //giving permission to read,write and execute to current folder
        if (err) {
          console.log("Failed to execute chmod", err);
        } else {
        }
      });

      fs.rmSync("./public/files", { recursive: true, force: true }); // deleting files folder for saving space
    } catch (error) {
      chmodr("./", 0o777, (err) => {
        if (err) {
          console.log("Failed to execute chmod", err);
        } else {
        }
      });
      console.log(error);
      fs.rmSync("./public/files", { recursive: true, force: true });
    }
  }
};
// -------------------------------------------------------------
// download purchase file
const downloadfile = async (req, res) => {
  const department = req.query.department;
  console.log("From download" + department);
  var wb = xlsx.utils.book_new();
  Purchase.find({ Department: department }, { _id: 0 }, (err, data) => {
    if (err) {
      console.log("Error : ", err);
    } else {
      var temp = JSON.stringify(data); // Convert JSON to Json string
      temp = JSON.parse(temp); // Convert to object
      var ws = xlsx.utils.json_to_sheet(temp); // Convert Json Object into sheet of EXCEL
      xlsx.utils.book_append_sheet(wb, ws, "sheet1"); //Append sheets into wb
      xlsx.writeFile(
        //Now creating new file with unique name and writing EXCEL data to it
        wb,
        (path1 = path.join(
          __dirname,
          "../../",
          "/datafetcher/",
          `${Date.now()}` + "test.xlsx"
        ))
      );
      res.download(path1);
    }
  });
};

// ==============================================================
// Upload repair file
const uploadRepairFile = async (req, res) => {
  const files = [];
  try {
    if (Array.isArray(req.files.uploads) && req.files.uploads.length > 0) {
      //checking if req.files.uploads is array and it exist or not
      for (let file of req.files.uploads) {
        files.push(file); //pushing each file into files array
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "File Array not Uploaded" });
  }

  for (var k = 0; k < files.length; k++) {
    //loop to iterate through all files in files array
    console.log(files[k].filename);
    //for pushing json to database
    try {
      // console.log(process.cwd()); F:\mehul study\React\sdp project\Purchase and Repair
      const path1 = path.join(
        __dirname,
        "../../",
        "/public/files/" + files[k].filename
      );
      // console.log(path1); F:\mehul study\React\sdp project\Purchase and Repair\public\files\1677520009765new.xlsx
      let xlFile = xlsx.readFile(path1);
      let sheet = xlFile.Sheets[xlFile.SheetNames[0]];
      const P_JSON = xlsx.utils.sheet_to_json(sheet);
      try {
        await Recurring.insertMany(P_JSON);
        res
          .status(200)
          .json({ message: "Data entered successfully for recurring file" });
      } catch (error) {
        res.send({ message: "Duplicate key found" });
      }

      chmodr("./", 0o777, (err) => {
        //giving permission to read,write and execute to current folder
        if (err) {
          console.log("Failed to execute chmod", err);
        } else {
        }
      });

      fs.rmSync("./public/files", { recursive: true, force: true }); // deleting files folder for saving space
    } catch (error) {
      chmodr("./", 0o777, (err) => {
        if (err) {
          console.log("Failed to execute chmod", err);
        } else {
        }
      });
      console.log(error);
      fs.rmSync("./public/files", { recursive: true, force: true });
    }
  }
};
// ------------------------------------------------------------
// download repair file
const downloadrepairfile = async (req, res) => {
  const department = req.query.department;
  var wb = xlsx.utils.book_new();
  Recurring.find({ Department: department }, { _id: 0 }, (err, data) => {
    if (err) {
      console.log("Error : ", err);
    } else {
      var temp = JSON.stringify(data); // Convert JSON to Json string
      temp = JSON.parse(temp); // Convert to object
      var ws = xlsx.utils.json_to_sheet(temp); // Convert Json Object into sheet of EXCEL
      xlsx.utils.book_append_sheet(wb, ws, "sheet1"); //Append sheets into wb
      xlsx.writeFile(
        //Now creating new file with unique name and writing EXCEL data to it
        wb,
        (path1 = path.join(
          __dirname,
          "../../",
          "/datafetcher/",
          `${Date.now()}` + "test.xlsx"
        ))
      );
      res.download(path1);
    }
  });
};
// =============================================================================
// Get all purchase data
const getpurchase = async (req, res) => {
  try {
    const department = req.query.department; // get the department from the query parameter
    const files = await Purchase.find({ Department: department }); // use the find method with the department query
    res.json({
      files: files,
    });
  } catch (error) {
    console.log(error);
  }
};

// =============================================================================
// Get all repair data
const getrepair = async (req, res) => {
  try {
    const department = req.query.department;
    const files = await Recurring.find({ Department: department });
    res.json({
      files: files,
    });
  } catch (error) {
    console.log(error);
  }
};
// =================================================================================
// Insert purchase data by form
const formpurchase = async (req, res) => {
  try {
    const {
      Sr_No,
      Academic_Year,
      Item,
      Description,
      Quantity,
      Total_Quantity,
      Price,
      Total,
      Bill_No,
      Invoice_Date,
      PO_No,
      PO_Date,
      Supplier_Name,
      Address,
      Contact,
      Department,
    } = req.body;

    await Purchase.create({
      Sr_No,
      Academic_Year,
      Item,
      Description,
      Quantity,
      Total_Quantity,
      Price,
      Total,
      Bill_No,
      Invoice_Date,
      PO_No,
      PO_Date,
      Supplier_Name,
      Address,
      Contact,
      Department,
    });

    res.json({ message: `Data inserted in purchase database` });
  } catch (error) {
    console.log(error);
  }
};
// =================================================================================
// Insert repair data by form

const formrepair = async (req, res) => {
  try {
    const {
      Sr_No,
      Description_of_Material,
      Name_Of_Supplier,
      Bill_No,
      Date,
      Amount,
      Material,
      Receiving_Year,
      Year,
      Yearly_expense,
      // Address,
      // Contact,
      Department,
    } = req.body;

    await Recurring.create({
      Sr_No,
      Description_of_Material,
      Name_Of_Supplier,
      Bill_No,
      Date,
      Amount,
      Material,
      Receiving_Year,
      Year,
      Yearly_expense,
      // Address,
      // Contact,
      Department,
    });

    res.json({ message: `Data inserted in recurring database` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
  formrepair,
};
