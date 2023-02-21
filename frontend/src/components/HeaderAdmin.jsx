import React from "react";
import { useState, useEffect } from "react";
import logo from "../Asset/logo3.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HeaderAdmin() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setName(response.data.name)
      });
  });

  const handleLogout = async (event) => {
    event.preventDefault();
    await axios
      .get("http://localhost:5000/admin/logout", {
        withCredentials: true,
      })
      .then((response) => navigate("/login/admin"));
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

        <div id="right">
          <ul className="nav-links">
            <li>{name}</li>
            <li>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default HeaderAdmin;
