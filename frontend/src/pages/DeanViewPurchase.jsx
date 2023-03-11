import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import HeaderDean from "../components/HeaderDean";
import DeanSidebarPurchase from "../components/DeanSidebarPurchase";

const DeanViewPurchase = () => {
  const [files, setFiles] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/dean/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setDepartment(response.data.department);
      });
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/dean/getpurchase`, {
        withCredentials: true,
        params: {
          department: department,
        },
      })
      .then((response) => setFiles(response.data.files));
  }, [department]);

  return (
    <>
      <div>
        <HeaderDean />
        <DeanSidebarPurchase />
        <div className="title-size text-color">Purchase data</div>
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
                            Academic_Year
                          </th>
                          <th className="py-3 px-6 text-center">Item</th>
                          <th className="py-3 px-6 text-center">Description</th>
                          <th className="py-3 px-6 text-center">Quantity</th>
                          <th className="py-3 px-6 text-center">
                            Total_Quantity
                          </th>
                          <th className="py-3 px-6 text-center">Price</th>
                          <th className="py-3 px-6 text-center">Total</th>
                          <th className="py-3 px-6 text-center">Bill_No</th>
                          <th className="py-3 px-6 text-center">
                            Invoice_Date
                          </th>
                          <th className="py-3 px-6 text-center">PO_No</th>
                          <th className="py-3 px-6 text-center">PO_Date</th>
                          <th className="py-3 px-6 text-center">
                            Supplier_Name
                          </th>
                          <th className="py-3 px-6 text-center">Address</th>
                          <th className="py-3 px-6 text-center">Contact</th>
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
                                <div>{file.Academic_Year}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Item}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Description}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Quantity}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Total_Quantity}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Price}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Total}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Bill_No}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Invoice_Date}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.PO_No}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.PO_Date}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Supplier_Name}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Address}</div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <div>{file.Contact}</div>
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

export default DeanViewPurchase;
