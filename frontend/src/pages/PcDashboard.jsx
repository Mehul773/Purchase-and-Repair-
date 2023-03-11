import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderPc from "../components/HeaderPc";
import PcSidebar from "../components/PcSidebarPurchase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import purchase from "../Asset/purchase.png";
import repair from "../Asset/repair.png";

function PcDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/dashboard", { withCredentials: true })
      .then((response) => {})
      .catch((err) => navigate("/login/pc"));
  });
  return (
    <>
      <HeaderPc />
      {/* <PcSidebar /> */}
      <div className="title-size" style={{ color: "#ffffff", margin: "15px" }}>
        Pc Dashboard
      </div>
      <div>
        <p className="text-color title-size">Select type of file</p>
        <div className="container-flex">
          <div>
            <Link to="/pc/purchase">
              <img src={purchase} alt="Purchase" className="choose-file-img" />
              <p className="text-color">Purchase</p>
            </Link>
          </div>
          <div>
            <Link to="/pc/repair">
              <img src={repair} alt="Repair" className="choose-file-img" />
              <p className="text-color">Recurring</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PcDashboard;
