import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderHod from "../components/HeaderHod";
import HodSidebar from "../components/HodSidebarPurchase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import purchase from "../Asset/purchase.png";
import repair from "../Asset/repair.png";

function HodDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/hod/dashboard", { withCredentials: true })
      .then((response) => {})
      .catch((err) => navigate("/login/hod"));
  });
  return (
    <>
      <HeaderHod />
      {/* <HodSidebar /> */}
      <div className="title-size" style={{ color: "#ffffff", margin: "15px" }}>
        Hod Dashboard
      </div>
      <div>
        <p className="text-color title-size">Select type of file</p>
        <div className="container-flex">
          <div>
            <Link to="/hod/purchase">
              <img src={purchase} alt="Purchase" className="choose-file-img" />
              <p className="text-color">Purchase</p>
            </Link>
          </div>
          <div>
            <Link to="/hod/repair">
              <img src={repair} alt="Repair" className="choose-file-img" />
              <p className="text-color">Recurring</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HodDashboard;
