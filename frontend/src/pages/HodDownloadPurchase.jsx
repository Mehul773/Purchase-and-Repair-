import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import HeaderHod from "../components/HeaderHod";
import HodSidebarPurchase from "../components/HodSidebarPurchase";

const HodDownloadPurchase = () => {
  const [department, setDepartment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/hod/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setDepartment(response.data.department);
      });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:5000/hod/downloadfile", {
      responseType: "blob",
      params: {
        department: department,
      },
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${Date.now()}` + "test.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <HeaderHod />
      <HodSidebarPurchase />
      <div className="download-flex">
        <div>
          <p className="text-color text-size">Download purchase file</p>
        </div>
        <div>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <button type="submit" className="btn download-btn" role="button">
              Download purchase file
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HodDownloadPurchase;
