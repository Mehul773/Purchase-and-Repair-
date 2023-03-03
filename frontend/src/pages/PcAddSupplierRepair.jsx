import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import HeaderPc from "../components/HeaderPc";
import PcSidebarRepair from "../components/PcSidebarRepair";

function PcAddSupplierRepair() {
  const [value, setValue] = useState(""); //supplier name
  const [suppAdd, setSuppAdd] = useState("");
  const [suppContact, setSuppContact] = useState("");
  const [all, setAll] = useState([]); //get all supplier name,address,contact

  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getsupp", { withCredentials: true })
      .then((response) => setAll(response.data.supp));
  });

  const handleSupp = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:5000/pc/addsupp",
        {
          supplier: value,
          address: suppAdd,
          contact: suppContact,
        },
        { withCredentials: true }
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error is " + error);
      });
  };

  const suppDelete = async (event, supplier) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/pc/deletesupp", {
        supplier: supplier,
      })
      .then((res) => {
        window.location.reload("user/pc/dashboard");
      })
      .catch((err) => {
        window.location.reload("user/pc/dashboard");
      });
  };
  return (
    <>
      <HeaderPc />
      <PcSidebarRepair />
      <div className="main">
        <div className="main-left">
          <div className="innner-left">
            <p id="form-text">Add Supplier </p>
            <form action="" className="box-grp">
              <input
                className="form-box"
                type="text"
                name="suppName"
                placeholder="Enter new supplier"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              ></input>
              <input
                className="form-box"
                type="text"
                name="suppAddress"
                placeholder="Enter supplier address"
                value={suppAdd}
                onChange={(event) => {
                  setSuppAdd(event.target.value);
                }}
              ></input>
              <input
                className="form-box"
                type="text"
                name="suppContact"
                placeholder="Enter supplier contact number"
                value={suppContact}
                onChange={(event) => {
                  setSuppContact(event.target.value);
                }}
              ></input>

              <button
                type="submit"
                className="form-box"
                id="submit-btn"
                onClick={handleSupp}
              >
                Add Supplier
              </button>
            </form>
          </div>
        </div>
        <div className="main-right text-color">
          <div className="box">
            <div className="box-title">All Suppliers</div>
            <div className="box-inner">
              {all.map((supp) => (
                <>
                  <div className="flex-row">
                    <div>{supp.supplier}</div>
                    <span>
                      <TiDelete
                        className="icon"
                        size={20}
                        onClick={(event) => suppDelete(event, supp.supplier)}
                      />
                    </span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PcAddSupplierRepair;
