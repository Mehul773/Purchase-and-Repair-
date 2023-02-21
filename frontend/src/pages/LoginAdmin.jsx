import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import login from "../Asset/Login.png";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/dashboard", { withCredentials: true })
      .then((response) => navigate("/admin/dashboard"));
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      toast.error("Email and password fields are required");
    } else {
      await axios
        .post(
          "http://localhost:5000/admin/login",
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.message === "Successfully logged in") {
            toast.success("Successfully logged in");
            navigate("/admin/dashboard");
          } else if (response.data.message === "Invalid Password") {
            toast.error("Invalid Password");
          } else if (response.data.message === "User not found") {
            toast.error("User not found");
          } else {
            console.log(response.data.message);
            toast.error("Email and Password fields are invalid");
          }
        });
    }
  };
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="main">
        <div className="main-left">
          <div className="innner-left">
            <p id="form-text">Login as Admin </p>
            <form action="" className="box-grp">
              <input
                className="form-box"
                type="text"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
              <input
                className="form-box"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              ></input>

              <button
                type="submit"
                className="form-box"
                id="submit-btn"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="main-right">
          <img src={login} className="login-img" srcSet="" alt="login" />
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
