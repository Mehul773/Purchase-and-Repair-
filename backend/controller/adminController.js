const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (!user) {
      res.json({ message: "User not found" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await user.generateAuthToken();
      console.log(`Generated by login ${token}`);

      res.cookie("jwtokenadmin", token, {
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

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await Admin.findOne({ email });

    if (userExists) {
      res.json({ message: "User Already Exists" });
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User

    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      const token = await user.generateAuthToken();
      console.log(`Generated by signup ${token}`);

      await user.save();

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        message: "Successfully signed up",
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("jwtokenadmin", { path: "/" });
    res.status(200).send("user logout");
  } catch (error) {
    console.log(error);
  }
};

const getAdminInfo = async (req, res) => {
  try {
    const { _id, name, email } = await Admin.findById(req.user._id);
    res.status(200).json({
      _id: _id,
      name: name,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loginAdmin, registerAdmin, logoutAdmin, getAdminInfo };
