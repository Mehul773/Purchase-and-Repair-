import React from "react";
import login from "../Asset/Login.png";

function SignUpPc() {
  return (
    <div className="main">
      <div className="main-left">
        <div className="innner-left">
          <p id="form-text">Sign up as Purchase Coordinator </p>
          <form action="" className="box-grp">
            <div className="form-box">
              <div className="form-icon"></div>
              <div className="form-text">
                <p className="dean-text">Enter your email address</p>
              </div>
            </div>
            <div className="form-box">
              <div className="form-icon"></div>
              <div >
                <p className="dean-text">Enter username</p>
              </div>
            </div>
            <div className="form-box">
              <div className="form-icon"></div>
              <div >
                <p className="dean-text">Enter Password</p>
              </div>
            </div>
            <div className="form-box">
              <div className="form-icon"></div>
              <div >
                <p className="dean-text">Re-enter password</p>
              </div>
            </div>
            <div className="form-box">
              <div className="form-icon"></div>
              <div >
                <p className="dean-text">Enter department</p>
              </div>
            </div>
            <div>
              <p className="already-text">Already have an account ? <a href="" className="text-color">Log in</a></p>
            </div>
            <div className="form-box" id="submit-btn">
              <div className="form-icon"></div>
              <div >
                <p className="submit-text">Create your account</p>
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

export default SignUpPc;
