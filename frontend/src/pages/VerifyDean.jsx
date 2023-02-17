import React from "react";
import { useEffect, useState, Link } from "react";
import axios from "axios";
import DeanDashboard from "./DeanDashboard";

const VerifyDean = () => {
  console.log("Rendered");
  const [verify, setverify] = useState(false);

  useEffect(() => {
    console.log("sfsfsfsfsfsfsfsfsxvvvsdgeg");
    open_about();
  });

  const open_about = async () => {
    try {
      /* await axios
        .get("http://localhost:5000/dean/dashboard", { withCredentials: true })
        .then((response) => {
          const data = response.json();
          console.log(data);
          setverify(true);
          if (!response.status === 200) {
            const err = new Error(response.err);
            throw err;
          }
        }); */
      console.log("sfsfsfsfsfsfsfsfsxvvvsdgeg");
      const response = await fetch("/dean/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(`Data is ${data}`);
      setverify(true);
    } catch (error) {
      console.log(error);
    }
  };

  return <>Dean Dashboard</>;
};

export default VerifyDean;
