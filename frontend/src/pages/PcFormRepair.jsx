import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import HeaderPc from "../components/HeaderPc";
import PcSidebar from "../components/PcSidebar";

function PcFormRepair() {
  
  return (
    <>
      <HeaderPc />
      <PcSidebar />
      <div className="title-size text-color">Form for Recurring file</div>
    </>
  );
}

export default PcFormRepair;
