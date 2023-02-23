import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import PendingUser from "./PendingUser";
import AllUser from "./AllUser";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

function AdminDashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const [pending, setPending] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <HeaderAdmin />
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
                setActive(true);
                setPending(false);
              }}
            >
              <Link to="#" className="sidebar-text">
                <BiUserCheck className="icon" />
                <span>Active users</span>
              </Link>
            </li>
            <li
              className="nav-text"
              onClick={() => {
                setActive(false);
                setPending(true);
              }}
            >
              <Link to="#" className="sidebar-text">
                <FiUsers className="icon" />
                <span>Pending users</span>
              </Link>
            </li>
{/*             <li className="nav-text">
              <Link to="#" className="sidebar-text">
                <IoAddCircleOutline className="icon" />
                <span>Add Department</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </IconContext.Provider>
      {pending ? <PendingUser /> : <></>}
      {active ? <AllUser /> : <></>}
    </>
  );
}

export default AdminDashboard;
