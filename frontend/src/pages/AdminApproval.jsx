import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import Header from "../components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";

function AdminApproval() {
  const [pcs, setPc] = useState([]);
  const location = useLocation();
  useEffect(() => {
    axios
      .post("http://localhost:5000/pc/req", { status: "Pending" })
      .then((res) => {
        setPc(res.data.pcs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <HeaderAdmin />
      <div className="min-h-screen">
        <div id="top">
          <p className="text-color" id="top-text">
            Pending Purchase Controller requests
          </p>
        </div>
        <div className="container">
          <div className="overflow-x-auto">
            <div>
              <div className="w-full">
                <div className="shadow-md rounded my-5">
                  <table className="min-w-max bg-white w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {/* <th className="py-3 px-6 text-left">Order ID</th> */}
                        <th className="py-3 px-6 text-left">User Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        {/* <th className="py-3 px-6 text-left">Total Pair</th> */}
                        {/* <th className="py-3 px-6 text-left">Total Price</th> */}
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    {pcs.map((pc) => (
                      <UserTable pc={pc} />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminApproval;
