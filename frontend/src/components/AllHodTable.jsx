import React from "react";
import axios from "axios";

function AllHodTable(hod) {
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
        <td className="py-3 px-6 text-center flex">
          <div
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
            onClick={HandleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Delete
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default AllHodTable;
