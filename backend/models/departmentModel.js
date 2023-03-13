const mongoose = require("mongoose");

const department = mongoose.Schema({
  department: { type: String, unique: true },
});

module.exports = mongoose.model("Department", department);
