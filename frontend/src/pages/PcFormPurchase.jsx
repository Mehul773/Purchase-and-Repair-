import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderPc from "../components/HeaderPc";
import PcSidebarPurchase from "../components/PcSidebarPurchase";
import { ToastContainer, toast } from "react-toastify";

function PcFormPurchase() {
  const [all, setAll] = useState([]); //get all supplier name,address,contact
  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getsupp", { withCredentials: true })
      .then((response) => setAll(response.data.supp));
  });
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierContact, setSupplierContact] = useState("");

  const [formData, setFormData] = useState({
    Sr_No: "",
    Academic_Year: "",
    Item: "",
    Description: "",
    Quantity: "",
    Total_Quantity: "",
    Price: "",
    Total: "",
    Bill_No: "",
    Invoice_Date: "",
    PO_No: "",
    PO_Date: "",
    Supplier_Name: "",
    Address: "",
    Contact: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:5000/pc/formpurchase",
        {
          Sr_No: formData.Sr_No,
          Academic_Year: formData.Academic_Year,
          Item: formData.Item,
          Description: formData.Description,
          Quantity: formData.Quantity,
          Total_Quantity: formData.Total_Quantity,
          Price: formData.Price,
          Total: formData.Total,
          Bill_No: formData.Bill_No,
          Invoice_Date: formData.Invoice_Date,
          PO_No: formData.PO_No,
          PO_Date: formData.PO_Date,
          Supplier_Name: supplierName,
          Address: supplierAddress,
          Contact: supplierContact,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message === "Data inserted in purchase database") {
          toast.success("Form submitted successfully");
        } else {
          toast.error("Error occurs ");
        }
      })
      .catch((error) => {
        console.log("Error is " + error);
      });
  };

  return (
    <>
      <ToastContainer />
      <HeaderPc />
      <PcSidebarPurchase />
      <div className="title-size text-color">Form for Purchase file</div>
      <div className="pc-form-main">
        <div className="pc-form-back">
          <div>
            <p id="form-text">Enter details for purchase file </p>
            <form action="" className="box-grp">
              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter  Sr no"
                name="Sr_No"
                value={formData.Sr_No}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter  Academic Year"
                name="Academic_Year"
                value={formData.Academic_Year}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Item"
                name="Item"
                value={formData.Item}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Description"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Quantity"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Total Quantity"
                name="Total_Quantity"
                value={formData.Total_Quantity}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Price"
                name="Price"
                value={formData.Price}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Total"
                name="Total"
                value={formData.Total}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Bill No"
                name="Bill_No"
                value={formData.Bill_No}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Invoice_Date"
                name="Invoice_Date"
                value={formData.Invoice_Date}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter PO No"
                name="PO_No"
                value={formData.PO_No}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter PO_Date"
                name="PO_Date"
                value={formData.PO_Date}
                onChange={handleInputChange}
              ></input>
              <select
                className="form-dropdown"
                value={supplierName}
                onChange={(event) => {
                  console.log(event.target.value);
                  if (event.target.value === "Select supplier") {
                    setSupplierName("");
                    setSupplierAddress("");
                    setSupplierContact("");
                  } else {
                    const selectedSupplier = event.target.value;
                    const selectedSupplierObject = all.find(
                      (supp) => supp.supplier === selectedSupplier
                    );
                    setSupplierName(selectedSupplier);
                    setSupplierAddress(selectedSupplierObject.address);
                    setSupplierContact(selectedSupplierObject.contact);
                  }
                }}
              >
                <option>Select supplier</option>
                {all.map((supp) => (
                  <option key={supp.supplier}>{supp.supplier}</option>
                ))}
              </select>

              <button
                type="submit"
                className="pc-form-box"
                id="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PcFormPurchase;
