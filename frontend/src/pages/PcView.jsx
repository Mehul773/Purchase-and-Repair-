import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import purchase from "../Asset/purchase.png";
import repair from "../Asset/repair.png";
import HeaderPc from "../components/HeaderPc";
import PcSidebar from "../components/PcSidebar";


const PcView = () => {
  return (
    <div>
      <HeaderPc/>
      <PcSidebar/>
      <div>
      <p className="text-color title-size">Which File do you want to view</p>
      <div className="container-flex">
        <div >
          <Link to="/pc/view/purchase">
            <img src={purchase} alt="Purchase" className="choose-file-img" />
            <p className="text-color">Purchase file</p>
          </Link>
        </div>
        <div>
          <Link to="/pc/view/repair">
            <img src={repair} alt="Repair" className="choose-file-img" />
            <p className="text-color">Recurring file</p>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PcView;
