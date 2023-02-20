import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const VerifyDean = () => {
  const [verify, setverify] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/dean/dashboard", { withCredentials: true })
      .then((response) => {
        setverify(true);
      })
      .catch((err) => console.log(err));
  });

  return <>{verify ? <div>Hii</div> : <div>Page does not exist</div>}</>;
};

export default VerifyDean;
