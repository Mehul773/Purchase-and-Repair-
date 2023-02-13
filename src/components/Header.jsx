import React from "react";
import logo from "../Asset/logo3.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header class="header">
        <div id="left">
          <div >
            <img id="logo"src={logo} alt="PR" />
          </div>
          <div id="pr">
            <p>Purchase and Repair</p>
          </div>
        </div>
        <div id="right">
          <ul class="nav-links">
            <li><a href="#">Sign Up</a></li>
            <li>
              <button class="btn"><a href="#">Login</a></button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
