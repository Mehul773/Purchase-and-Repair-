import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const VerifyPc = () => {
  const [verify, setverify] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/dashboard", { withCredentials: true })
      .then((response) => {
        setverify(true);
      })
      .catch((err) => console.log(err));
  });

  return <>{verify ? <div>Hii</div> : <div>Page does not exist</div>}</>;
};

export default VerifyPc;
