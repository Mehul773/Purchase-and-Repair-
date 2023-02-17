import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import circle from "../Asset/HomePage-circle.png";

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="workspace">
        <div className="left-home">
          <div id="top">
            <p className="text-color left-text" id="top-text">
              Organize your purchase <br /> and repair logs easily.{" "}
            </p>
          </div>
          <div id="middle">
            <p className="text-color left-text" id="left-long-text">
              Keep track of your organization’s <br /> purchase and repair logs
              with us easily,
              <br /> We will help you to efficiently organize <br /> and view
              your organization’s purchase <br /> and repair logs.{" "}
            </p>
          </div>
          <Link to="/signup">
            <div id="down-get-started-btn" className="btn">
              Get Started
            </div>
          </Link>
        </div>
        <div className="right-home">
          <img id="circle" src={circle} alt="" srcSet="" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
