import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderHod from "../components/HeaderHod";

const VerifyHod = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/hod/dashboard", { withCredentials: true })
      .then((response) => {})
      .catch((err) => navigate("/login/hod"));
  });

  return (
    <>
      <HeaderHod />
      <div>Hii</div>
    </>
  );
};

export default VerifyHod;
