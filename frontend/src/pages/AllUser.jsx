import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllDeanTable from "../components/AllDeanTable";
import AllHodTable from "../components/AllHodTable";
import AllPcTable from "../components/AllPcTable";

function AllUser() {
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
        axios.post("http://localhost:5000/pc/req", { status: "Active" }),
        axios.post("http://localhost:5000/dean/req", { status: "Active" }),
        axios.post("http://localhost:5000/hod/req", { status: "Active" }),
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
          <p className="text-color headings">Active Purchase Coordinators</p>
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
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    {pcs.map((pc) => (
                      <AllPcTable pc={pc} />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-color headings">Active Deans</p>
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
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    {dean.map((dean) => (
                      <AllDeanTable dean={dean} />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-color headings">Active Hods</p>
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
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    {hod.map((hod) => (
                      <AllHodTable hod={hod} />
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

export default AllUser;
