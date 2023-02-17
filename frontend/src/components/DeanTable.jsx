import React from "react";
import axios from "axios";

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
        window.location.reload("user/admin/dashboard");
      })
      .catch((err) => console.log(err));
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
        <td className="py-3 px-6 text-center">
          <div
            className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
            onClick={Changestatus}
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
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default DeanTable;
