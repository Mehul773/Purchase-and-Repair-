import React from "react";
import logodean from "../Asset/Dean1.png";
import logohod from "../Asset/Hod.png";
import logopc from "../Asset/Pc.png";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function SignUp() {
  return (
    <div>
      <Header />
      <div className="workspace-chooses">
        <div className="text-role">
          <p className="text-color" id="role-text">
            Select your role for Sign up
          </p>
        </div>
        <div className="outer-rect">
          <Link to="/signup/dean">
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

          <Link to="/signup/hod">
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

          <Link to="/signup/pc">
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

export default SignUp;
