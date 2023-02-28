import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { IconContext } from "react-icons";
import { TiDelete } from "react-icons/ti";
import HeaderPc from "../components/HeaderPc";
import Download from "../components/Download";
import Upload from "../components/Upload";

function PcDashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [supp, setSupp] = useState(true);
  const [upload, setUpload] = useState(false);
  const [download, setDownload] = useState(false);

  const [value, setValue] = useState("");
  const [suppAdd, setSuppAdd] = useState("");
  const [suppContact, setSuppContact] = useState("");
  const [all, setAll] = useState([]);

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
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <HeaderPc />
      <IconContext.Provider value={{ color: "#00935A" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars className="icon icon-bar" onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items " onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose className="icon icon-bar" />
              </Link>
            </li>
            <li
              className="nav-text"
              onClick={() => {
                setUpload(true);
                setDownload(false);
                setSupp(false);
              }}
            >
              <Link to="#" className="sidebar-text">
                <FiUpload className="icon" />
                <span>Upload file</span>
              </Link>
            </li>
            <li
              className="nav-text"
              onClick={() => {
                setUpload(false);
                setDownload(true);
                setSupp(false);
              }}
            >
              <Link to="#" className="sidebar-text">
                <FiDownload className="icon" />
                <span>Download file</span>
              </Link>
            </li>
            <li
              className="nav-text"
              onClick={() => {
                setUpload(false);
                setDownload(false);
                setSupp(true);
              }}
            >
              <Link to="#" className="sidebar-text">
                <IoAddCircleOutline className="icon" />
                <span>Add Supplier</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
      {upload ? <Upload /> : <></>}
      {download ? <Download /> : <></>}
      {supp ? (
        <>
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
                            onClick={(event) =>
                              suppDelete(event, supp.supplier)
                            }
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
      ) : (
        <></>
      )}
    </>
  );
}

export default PcDashboard;
