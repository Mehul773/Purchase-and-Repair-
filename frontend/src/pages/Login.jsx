import React from "react";
import logodean from "../Asset/Dean1.png";
import logohod from "../Asset/Hod.png";
import logopc from "../Asset/Pc.png";
import logoAdmin from "../Asset/Admin.png";

function ChooseS() {
  return (
    <div className="workspace-chooses">
      <div className="text-role">
        <p className="text-color" id="role-text">
          Select your role for Login
        </p>
      </div>
      <div className="outer-rect">
        <div className="inner-rect">
          <img src={logoAdmin} className="choose-actor-img" alt="" srcSet="" />
          <p className="choose-actor-text">Admin</p>
        </div>
        <div className="inner-rect">
          <img src={logodean} className="choose-actor-img" alt="" srcSet="" />
          <p className="choose-actor-text">Dean</p>
        </div>
        <div className="inner-rect">
          <img src={logohod} className="choose-actor-img" alt="" srcSet="" />
          <p className="choose-actor-text">HOD</p>
        </div>
        <div className="inner-rect">
          <img src={logopc} className="choose-actor-img" alt="" srcSet="" />
          <p className="choose-actor-text">
            Purchase <br />
            Co-ordinator
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseS;
