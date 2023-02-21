import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyDean = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/dean/dashboard", { withCredentials: true })
      .then((response) => {})
      .catch((err) => navigate("/login/dean"));
  });

  return <>{<div>Hii</div>}</>;
};

export default VerifyDean;
