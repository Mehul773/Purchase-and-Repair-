import React from "react";
import logodean from "../Asset/Dean1.png";
import logohod from "../Asset/Hod.png";
import logopc from "../Asset/Pc.png";
import logoAdmin from "../Asset/Admin.png";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function ChooseS() {
  return (
    <div>
      <Header />
      <div className="workspace-chooses">
        <div className="text-role">
          <p className="text-color" id="role-text">
            Select your role for Login
          </p>
        </div>
        <div className="outer-rect">
          <Link to="/login/admin">
            <div className="inner-rect">
              <img
                src={logoAdmin}
                className="choose-actor-img"
                alt=""
                srcSet=""
              />
              <p className="choose-actor-text">Admin</p>
            </div>
          </Link>

          <Link to="/login/dean">
            <div className="inner-rect">
              <img
                src={logodean}
                className="choose-actor-img"
                alt=""
                srcSet=""
              />
              <p className="choose-actor-text">Dean</p>
            </div>
          </Link>
          <Link to="/login/hod">
            <div className="inner-rect">
              <img
                src={logohod}
                className="choose-actor-img"
                alt=""
                srcSet=""
              />
              <p className="choose-actor-text">HOD</p>
            </div>
          </Link>

          <Link to="/login/pc">
            <div className="inner-rect">
              <img src={logopc} className="choose-actor-img" alt="" srcSet="" />
              <p className="choose-actor-text">
                Purchase <br />
                Co-ordinator
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChooseS;
