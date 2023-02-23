import React from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

function AllDeanTable(dean) {
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
          <span className="text-green-500 rounded-full text-ls">
            {dean.dean.status}
          </span>
        </td>
        <td className="py-3 px-6 text-center" style={{ cursor: "pointer" }}>
          <div
            className="transform hover:text-red-500 hover:scale-110"
            onClick={HandleDelete}
          >
            <RiDeleteBin6Line className="table-icons"></RiDeleteBin6Line>
            Delete
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default AllDeanTable;
