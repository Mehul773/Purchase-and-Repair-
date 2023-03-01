import React, { useEffect, useState } from "react";
import HeaderPc from "../components/HeaderPc";
import PcSidebar from "../components/PcSidebar";

function PcDashboard() {
  
  return (
    <>
      <HeaderPc />
      <PcSidebar/>
      <div className="text-color title-size">Pc Dashboard</div>
      
    </>
  );
}

export default PcDashboard;
