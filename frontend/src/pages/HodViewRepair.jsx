import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import HeaderHod from "../components/HeaderHod";
import HodSidebarRepair from "../components/HodSidebarRepair";

const HodViewRepair = () => {
  const [files, setFiles] = useState([]);
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
  useEffect(() => {
    axios
      .get("http://localhost:5000/hod/getrepair", {
        withCredentials: true,
        params: {
          department: department,
        },
      })
      .then((response) => setFiles(response.data.files));
  });

  return (
    <>
      <div>
        <HeaderHod />
        <HodSidebarRepair />
        <div className="title-size text-color">Recurring data</div>
        <div className="min-h-screen">
          <div>
            <p className="text-color title-size"></p>
          </div>
          <div className="container table">
            <div className="overflow-x-auto">
              <div>
                <div className="w-full">
                  <div className="shadow-md rounded my-5">
                    <table className="min-w-max bg-white w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-center">Sr_No</th>
                          <th className="py-3 px-6 text-center">
                            Description_of_Material
                          </th>
                          <th className="py-3 px-6 text-center">
                            Name_Of_Supplier
                          </th>
                          <th className="py-3 px-6 text-center">Bill_No</th>
                          <th className="py-3 px-6 text-center">Date</th>
                          <th className="py-3 px-6 text-center">Amount</th>
                          <th className="py-3 px-6 text-center">Material</th>
                          <th className="py-3 px-6 text-center">
                            Receiving_Year
                          </th>
                          <th className="py-3 px-6 text-center">Year</th>
                          <th className="py-3 px-6 text-center">
                            Yearly_expense
                          </th>
                          <th className="py-3 px-6 text-center">Department</th>
                        </tr>
                      </thead>
                      {files.map((file) => (
                        <>
                          <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                              <td className="py-3 px-6 text-center">
                                <div>{file.Sr_No}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Description_of_Material}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Name_Of_Supplier}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Bill_No}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Date}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Amount}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Material}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Receiving_Year}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Year}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Yearly_expense}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Department}</div>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HodViewRepair;
