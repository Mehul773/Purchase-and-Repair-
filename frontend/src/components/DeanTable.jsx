import React from "react";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

function DeanTable(dean) {
  const Changestatus = async (event) => {
    event.preventDefault();
    console.log("click");
    axios
      .post("http://localhost:5000/dean/status", {
        email: dean.dean.email,
        status: dean.dean.status,
      })
      .then((res) => {
        window.location.reload("/user/admin/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const HandleDelete = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/dean/delete", {
        email: dean.dean.email,
      })
      .then((res) => {
        window.location.reload("user/admin/dashboard");
      })
      .catch((err) => {
        window.location.reload("user/admin/dashboard");
      });
  };

  return (
    <tbody className="text-gray-600 text-sm font-light">
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-center">
          <span className="font-medium">{dean.dean.name}</span>
        </td>
        <td className="py-3 px-6">
          <div>{dean.dean.email}</div>
        </td>
        <td className="py-3 px-6">
          <span className="text-red-500 rounded-full text-ls">
            {dean.dean.status}
          </span>
        </td>
        <td className="py-3 px-6">
          <div>{dean.dean.createdAt}</div>
        </td>
        <td className="py-3 px-6 text-center flex items-center justify-center">
          <div
            className="mr-4 transform hover:text-green-500 hover:scale-110 cursor-pointer"
            onClick={Changestatus}
          >
            <FiCheck className="table-icons" />
            Accept
          </div>
          <div
            className="transform hover:text-red-500 hover:scale-110 cursor-pointer"
            onClick={HandleDelete}
          >
            <RxCross2 className="table-icons" />
            Decline
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default DeanTable;
