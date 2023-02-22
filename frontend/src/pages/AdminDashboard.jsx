import React, { useState, useEffect } from "react";
import PcTable from "../components/PcTable";
import DeanTable from "../components/DeanTable";
import HodTable from "../components/HodTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import PendingUser from "./PendingUser";
import AllUser from "./AllUser";

function AdminDashboard() {
  return (
    <>
      <HeaderAdmin />
      <PendingUser />
      <AllUser />
    </>
  );
}

export default AdminDashboard;
