import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

function SidebarAdmin() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#00935A" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars className="icon" onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose className="icon" />
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/admin/dashboard/active" className="sidebar-text">
                <BiUserCheck className="icon" />
                <span>Active users</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/admin/dashboard/pending" className="sidebar-text">
                <FiUsers className="icon" />
                <span>Pending users</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/admin/dashboard/addDept" className="sidebar-text">
                <IoAddCircleOutline className="icon" />
                <span>Add Department</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SidebarAdmin;
