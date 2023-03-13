import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { TiDelete } from "react-icons/ti";

function AdminDashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const [pending, setPending] = useState(true);
  const [addDept, setAddDept] = useState(false);

  const [dept, setDept] = useState("");
  const [all, setAll] = useState([]); //get all departments

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
          department: dept,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message === "Duplicate") {
          toast.error("Department already exist");
        }
      })
      .catch((error) => {
        console.log("Error is " + error);
      });
  };
  const deptDelete = async (event, department) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/admin/deletedept", {
        department: department,
      })
      .then((res) => {
        // window.location.reload("user/admin/dashboard");
      })
      .catch((err) => {
        // window.location.reload("user/admin/dashboard");
      });
  };
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <HeaderAdmin />
      <ToastContainer />
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
                setAddDept(false);
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
                setAddDept(false);
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
                setAddDept(true);
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
      {addDept ? (
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
                    value={dept}
                    onChange={(event) => {
                      setDept(event.target.value);
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
                <div className="box-title">All Departments</div>
                <div className="box-inner">
                  {all.map((dept) => (
                    <>
                      <div className="flex-row">
                        <div>{dept.department}</div>
                        <span>
                          <TiDelete
                            className="icon"
                            size={20}
                            onClick={(event) =>
                              deptDelete(event, dept.department)
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

export default AdminDashboard;
