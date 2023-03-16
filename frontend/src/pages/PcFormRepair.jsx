import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderPc from "../components/HeaderPc";
import PcSidebarRepair from "../components/PcSidebarRepair";
import { ToastContainer, toast } from "react-toastify";

function PcFormRepair() {
  const [all, setAll] = useState([]); //get all supplier name,address,contact
  const [department, setDepartment] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setDepartment(response.data.department);
      });
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getsupp", { withCredentials: true })
      .then((response) => setAll(response.data.supp));
  });
  const [supplierName, setSupplierName] = useState("");
  // const [supplierAddress, setSupplierAddress] = useState("");
  // const [supplierContact, setSupplierContact] = useState("");

  const [formData, setFormData] = useState({
    Sr_No: "",
    Description_of_Material: "",
    Name_Of_Supplier: "",
    Bill_No: "",
    Date: "",
    Amount: "",
    Material: "",
    Receiving_Year: "",
    Year: "",
    Yearly_expense: "",
    Department: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:5000/pc/formrepair",
        {
          Sr_No: formData.Sr_No,
          Description_of_Material: formData.Description_of_Material,
          Name_Of_Supplier: supplierName,
          Bill_No: formData.Bill_No,
          Date: formData.Date,
          Amount: formData.Amount,
          Material: formData.Material,
          Receiving_Year: formData.Receiving_Year,
          Year: formData.Year,
          Yearly_expense: formData.Yearly_expense,
          // Address: supplierAddress,
          // Contact: supplierContact,
          Department: department,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message === "Data inserted in recurring database") {
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
      <PcSidebarRepair />
      <div className="title-size text-color">
        Upload Recurring details via form
      </div>
      <div className="pc-form-main">
        <div className="pc-form-back">
          <div>
            <p id="form-text">Enter details of recurring</p>
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
                placeholder="Enter Description of Material"
                name="Description_of_Material"
                value={formData.Description_of_Material}
                onChange={handleInputChange}
              ></input>

              <select
                className="form-dropdown"
                value={supplierName}
                onChange={(event) => {
                  if (event.target.value === "Select supplier") {
                    setSupplierName("");
                    // setSupplierAddress("");
                    // setSupplierContact("");
                  } else {
                    const selectedSupplier = event.target.value;
                    // const selectedSupplierObject = all.find(
                    //   (supp) => supp.supplier === selectedSupplier
                    // );
                    setSupplierName(selectedSupplier);
                    // setSupplierAddress(selectedSupplierObject.address);
                    // setSupplierContact(selectedSupplierObject.contact);
                  }
                }}
              >
                <option>Select supplier</option>
                {all.map((supp) => (
                  <option key={supp.supplier}>{supp.supplier}</option>
                ))}
              </select>

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
                placeholder="Enter Date in dd/mm/yyyy fromat"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Amount"
                name="Amount"
                value={formData.Amount}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Material"
                name="Material"
                value={formData.Material}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Receiving Date in dd/mm/yyyy format"
                name="Receiving_Year"
                value={formData.Receiving_Year}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Year"
                name="Year"
                value={formData.Year}
                onChange={handleInputChange}
              ></input>

              <input
                className="pc-form-box"
                type="text"
                placeholder="Enter Yearly expense"
                name="Yearly_expense"
                value={formData.Yearly_expense}
                onChange={handleInputChange}
              ></input>

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

export default PcFormRepair;
