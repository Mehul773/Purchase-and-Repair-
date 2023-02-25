import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AllUser from "./AllUser";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { IconContext } from "react-icons";
import HeaderPc from "../components/HeaderPc";

function PcDashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [supp, setSupp] = useState(true); 
  const [upload, setUpload] = useState(false); 
  const [download, setDownload] = useState(false); 

  const [value, setValue] = useState("");
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getsupp", { withCredentials: true })
      .then((response) => setAll(response.data.supp));
  });

  const handleDept = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:5000/pc/addsupp",
        {
          department: value,
        },
        { withCredentials: true }
      )
      .then((response) => {})
      .catch((error) => {
        console.log("Error is " + error);
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
            <li className="nav-text" onClick={() => {
              setUpload(true);
              setDownload(false);
              setSupp(false);
            }}>
              <Link to="#" className="sidebar-text">
                <FiUpload className="icon" />
                <span>Upload file</span>
              </Link>
            </li>
            <li className="nav-text" onClick={() => {
              setUpload(false);
              setDownload(true);
              setSupp(false);
            }}>
              <Link to="#" className="sidebar-text">
                <FiDownload className="icon" />
                <span>Download file</span>
              </Link>
            </li>
            <li className="nav-text" onClick={() => {
              setUpload(false);
              setDownload(false);
              setSupp(true);
            }}>
              <Link to="#" className="sidebar-text">
                <IoAddCircleOutline className="icon" />
                <span>Add Supplier</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
      {upload ? <Upload/> : <></>}
      {download ? <Download/> : <></>}
      {supp ? <AddSupplier/> : <></>}
    </>
  );
}

export default PcDashboard;
