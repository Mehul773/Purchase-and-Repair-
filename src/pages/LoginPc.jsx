import React from "react";
import login from "../Asset/Login.png";

function LoginPc() {
  return (
    <div className="main">
      <div className="main-left">
        <div className="innner-left">
          <p id="form-text">Login up as Purchase Co-ordinator </p>
          <form action="" className="box-grp">
            <div className="form-box">
              <div className="form-icon"></div>
              <div className="form-text">
                <p className="dean-text">Enter your email address</p>
              </div>
            </div>

            <div className="form-box">
              <div className="form-icon"></div>
              <div>
                <p className="dean-text">Enter Password</p>
              </div>
            </div>

            <div>
              <p className="already-text">
                {" "}
                <a href="" className="text-color">
                  Forgot password ?
                </a>
              </p>
            </div>
            <div className="form-box" id="submit-btn">
              <div className="form-icon"></div>
              <div>
                <p className="submit-text">Login</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="main-right">
        <img src={login} className="login-img" srcset="" />
      </div>
    </div>
  );
}

export default LoginPc;
