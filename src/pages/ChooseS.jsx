import React from "react";
import logodean from "../Asset/Dean1.png";
import logohod from "../Asset/Hod.png";
import logopc from "../Asset/Pc.png";

function ChooseS() {
  return (
    <div class="workspace-chooses">
      <div class="text-role">
        <p class="text-color" id="role-text">
          Select your role for Sign up
        </p>
      </div>
      <div class="outer-rect">
        <div class="inner-rect">
          <img src={logodean} className="choose-actor-img" alt="" srcset="" />
          <p className="choose-actor-text">Dean</p>
        </div>
        <div class="inner-rect">
          <img src={logohod} className="choose-actor-img" alt="" srcset="" />
          <p className="choose-actor-text">HOD</p>
        </div>
        <div class="inner-rect">
          <img src={logopc} className="choose-actor-img" alt="" srcset="" />
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
