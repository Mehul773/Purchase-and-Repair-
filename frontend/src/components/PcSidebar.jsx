import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { IconContext } from "react-icons";

function PcSidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
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
            <li className="nav-text">
              <Link to="/pc/form" className="sidebar-text">
                <FiUpload className="icon" />
                <span>Insert by form</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/pc/upload" className="sidebar-text">
                <FiUpload className="icon" />
                <span>Upload file</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/pc/download" className="sidebar-text">
                <FiDownload className="icon" />
                <span>Download file</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/pc/view" className="sidebar-text">
                <FiDownload className="icon" />
                <span>View data</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/pc/addsupp" className="sidebar-text">
                <IoAddCircleOutline className="icon" />
                <span>Add Supplier</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default PcSidebar;
