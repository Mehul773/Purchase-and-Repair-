import React from "react";
import axios from "axios";
import { useEffect } from "react";

function RequestPending() {
  useEffect(() => {
    axios
      .post("http://localhost:5000/pc/req", { status: "Pending" })
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);
  return <div>RequestPending</div>;
}

export default RequestPending;
