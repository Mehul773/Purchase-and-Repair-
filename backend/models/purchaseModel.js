const mongoose = require("mongoose");

const purchase = mongoose.Schema({
  Sr_No: String,
  Purchase_Recurring: String,
  Academic_Year: String,
  Item: String,
  Description: String,
  Quantity: String,
  Total_Quantity: String,
  Price: String,
  Total: String,
  Bill_No: String,
  Invoice_Date: String,
  PO_No: String,
  Po_Date: String,
  Supplier_Name: String,
  Address: String,
  Contact: String,
  Department: String,
});

module.exports = mongoose.model("Purchase", purchase);
