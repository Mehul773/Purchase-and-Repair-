import React, { useState, useEffect } from "react";
import PcTable from "../components/PcTable";
import DeanTable from "../components/DeanTable";
import HodTable from "../components/HodTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingUser() {
  const [pcs, setPc] = useState([]);
  const [dean, setDean] = useState([]);
  const [hod, setHod] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:5000/admin/dashboard", {
          withCredentials: true,
        }),
        axios.post("http://localhost:5000/pc/req", { status: "Pending" }),
        axios.post("http://localhost:5000/dean/req", { status: "Pending" }),
        axios.post("http://localhost:5000/hod/req", { status: "Pending" }),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          setPc(res2.data.pcs);
          setDean(res3.data.dean);
          setHod(res4.data.hod);
        })
      )
      .catch((err) => navigate("/login/admin"));
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <div>
          <h2 className="text-color headings">
            Pending Purchase Coordinator requests
          </h2>
        </div>
        <div className="container table">
          <div className="overflow-x-auto">
            <div>
              <div className="w-full">
                <div className="shadow-md rounded my-5">
                  <table className="min-w-max bg-white w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">User Name</th>
                        <th className="py-3 px-6 text-center">Email</th>
                        <th className="py-3 px-6 text-center">Department</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Date & Time</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    {pcs.map((pc) => (
                      <PcTable pc={pc} />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-color headings">Pending Dean requests</p>
        </div>
        <div className="container table">
          <div className="overflow-x-auto">
            <div>
              <div className="w-full">
                <div className="shadow-md rounded my-5">
                  <table className="min-w-max bg-white w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">User Name</th>
                        <th className="py-3 px-6 text-center">Email</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Date & Time</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    {dean.map((dean) => (
                      <DeanTable dean={dean} />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-color headings">Pending Hod requests</p>
        </div>
        <div className="container table">
          <div className="overflow-x-auto">
            <div>
              <div className="w-full">
                <div className="shadow-md rounded my-5">
                  <table className="min-w-max bg-white w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">User Name</th>
                        <th className="py-3 px-6 text-center">Email</th>
                        <th className="py-3 px-6 text-center">Department</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Date & Time</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    {hod.map((hod) => (
                      <HodTable hod={hod} />
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

export default PendingUser;
