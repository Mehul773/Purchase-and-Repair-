const mongoose = require("mongoose");

const purchase = mongoose.Schema(
  {
    Sr_No: { type: String, default: "" },
    Purchase_Recurring: { type: String, default: "Purchase" },
    Academic_Year: { type: Number, default: "" },
    Item: { type: String, default: "" },
    Description: { type: String, default: "" },
    Quantity: { type: Number, default: "" },
    Total_Quantity: { type: Number, default: "" },
    Price: { type: Number, default: "" },
    Total: { type: Number, default: "" },
    Bill_No: { type: String, default: "" },
    Invoice_Date: { type: String, default: "" },
    PO_No: { type: String, default: "" },
    PO_Date: { type: String, default: "" },
    PO_Date: { type: String, default: "" },
    Supplier_Name: { type: String, default: "" },
    Address: { type: String, default: "" },
    Contact: { type: String, default: "" },
    Department: {type: String, default: ""},
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Purchase", purchase);
