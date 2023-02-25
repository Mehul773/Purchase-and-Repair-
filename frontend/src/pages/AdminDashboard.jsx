import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const [dept, setDept] = useState(false);

  const [value, setValue] = useState("");
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/getdept", { withCredentials: true })
      .then((response) => setAll(response.data.depts));
  });

  const handleDept = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:5000/admin/adddept",
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
                setDept(false);
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
                setDept(false);
              }}
            >
              <Link to="#" className="sidebar-text">
                <FiUsers className="icon" />
                <span>Pending users</span>
              </Link>
            </li>
            <li
              className="nav-text"
              onClick={() => {
                setActive(false);
                setPending(false);
                setDept(true);
              }}
            >
              <Link to="#" className="sidebar-text">
                <IoAddCircleOutline className="icon" />
                <span>Add Department</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>

      {pending ? <PendingUser /> : <></>}
      {active ? <AllUser /> : <></>}
      {dept ? (
        <>
          <div className="main">
            <div className="main-left">
              <div className="innner-left">
                <p id="form-text">Add Department </p>
                <form action="" className="box-grp">
                  <input
                    className="form-box"
                    type="text"
                    name="dept"
                    placeholder="Enter new department"
                    value={value}
                    onChange={(event) => {
                      setValue(event.target.value);
                    }}
                  ></input>

                  <button
                    type="submit"
                    className="form-box"
                    id="submit-btn"
                    onClick={handleDept}
                  >
                    Add Department
                  </button>
                </form>
              </div>
            </div>
            <div className="main-right text-color">
              <div className="box">
                <div className="box-title">
                  All Departments
                </div>
                <div className="box-inner">
                  {all.map((dept) => (
                    <div>{dept.department}</div>
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

export default AdminDashboard;
