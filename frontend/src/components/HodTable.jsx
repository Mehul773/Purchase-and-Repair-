import React from "react";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

function HodTable(hod) {
  const Changestatus = async (event) => {
    event.preventDefault();
    console.log("click");
    axios
      .post("http://localhost:5000/hod/status", {
        email: hod.hod.email,
        status: hod.hod.status,
      })
      .then((res) => {
        window.location.reload("/user/admin/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const HandleDelete = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/hod/delete", {
        email: hod.hod.email,
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
          <span className="font-medium">{hod.hod.name}</span>
        </td>
        <td className="py-3 px-6">
          <div>{hod.hod.email}</div>
        </td>
        <td className="py-3 px-6">
          <div>{hod.hod.department}</div>
        </td>
        <td className="py-3 px-6">
          <span className="text-red-500 rounded-full text-ls">
            {hod.hod.status}
          </span>
        </td>
        <td className="py-3 px-6">
          <div>{hod.hod.createdAt}</div>
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

export default HodTable;
