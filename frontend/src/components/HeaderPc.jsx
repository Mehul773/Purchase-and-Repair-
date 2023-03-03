import React from "react";
import { useState, useEffect } from "react";
import logo from "../Asset/logo3.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle  } from "@fortawesome/free-solid-svg-icons";

function HeaderPc() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setName(response.data.name);
        setDepartment(response.data.department);
      });
  });

  const handleLogout = async (event) => {
    event.preventDefault();
    await axios
      .get("http://localhost:5000/pc/logout", {
        withCredentials: true,
      })
      .then((response) => navigate("/login/pc"));
  };

  return (
    <div>
      <header className="header">
        <Link to="/">
          <div id="left">
            <div>
              <img id="logo" src={logo} alt="PR" />
            </div>
            <div id="pr">
              <p>Purchase and Repair</p>
            </div>
          </div>
        </Link>

        <div className="right">
          <ul className="nav-links">
            <div className="left-li-div">
              <li className="icon-username">
                <div><FontAwesomeIcon icon={faUserCircle} className="user-icon" /></div>
                 <div>{name}</div>
              </li>
              <li>{department}</li>
            </div>
            <div>
              <li>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </div>
          </ul>
        </div>
      </header>

    </div>
  );
}

export default HeaderPc;
