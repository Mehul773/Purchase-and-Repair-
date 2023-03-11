const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Dean = require("../models/deanModel");
const nodemailer = require("../config/nodemailer.config");
const Purchase = require("../models/purchaseModel");
const Recurring = require("../models/recurringModel");
const xlsx = require("xlsx");
const path = require("path");

const loginDean = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Dean.findOne({ email });

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

      res.cookie("jwtokendean", token, {
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

const registerDean = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await Dean.findOne({ email });

    if (userExists) {
      res.json({ message: "User Already Exists" });
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User

    const user = await Dean.create({
      name,
      email,
      password: hashedPassword,
      status: "Pending",
    });

    if (user) {
      const token = await user.generateAuthToken();

      await user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("E-mail information of user: ");

        console.log(user.name);
        console.log(user.email);
        console.log(user.token);

        nodemailer.sendConfirmationEmail(user.name, user.email, user.token);
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

    const dean = await Dean.find({ status });
    if (!dean) {
      res.json({ message: "No pending Dean" });
    } else {
      res.json({ message: "Dean Details", dean: dean });
    }
  } catch (error) {
    console.log(error);
  }
};

const makeActive = async (req, res) => {
  try {
    const { email } = req.body;

    Dean.findOne({ email }, (err, dean) => {
      if (err) return res.status(500).send(err);

      if (dean.status === "Pending") {
        dean.status = "Active";
      }

      dean.save((err, dean) => {
        if (err) return res.status(500).send(err);
        nodemailer.sendActivationEmail(dean.name, dean.email, dean.token);
        res.send(dean);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutDean = async (req, res) => {
  try {
    res.clearCookie("jwtokendean", { path: "/" });
    res.status(200).send("user logout");
  } catch (error) {
    console.log(error);
  }
};

const getDeanInfo = async (req, res) => {
  try {
    /*     console.log(req.user); */
    const { _id, name, email } = await Dean.findById(req.user._id);
    res.status(200).json({
      _id: _id,
      name: name,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteDean = async (req, res) => {
  try {
    const { email } = req.body;

    const dean = await Dean.findOne({ email });

    if (!dean) {
      res.status(400);
      console.log("Dean not found to be deleted");
    }
    nodemailer.sendDeclineEmail(dean.name, dean.email, dean.token);
    await dean.remove();

    return res.status(404).json({ message: "Dean deleted" });
  } catch (error) {
    console.log(error);
  }
};

const downloadfile = async (req, res) => {
  var wb = xlsx.utils.book_new();
  Purchase.find({}, { _id: 0 }, (err, data) => {
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

const downloadrepairfile = async (req, res) => {
  var wb = xlsx.utils.book_new();
  Recurring.find({}, { _id: 0 }, (err, data) => {
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

const getpurchase = async (req, res) => {
  try {
    const files = await Purchase.find(); // use the find method with the department query
    res.json({
      files: files,
    });
  } catch (error) {
    console.log(error);
  }
};

const getrepair = async (req, res) => {
  try {
    const files = await Recurring.find();
    res.json({
      files: files,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginDean,
  registerDean,
  getAllPending,
  makeActive,
  getDeanInfo,
  logoutDean,
  deleteDean,
  downloadfile,
  downloadrepairfile,
  getpurchase,
  getrepair,
};
