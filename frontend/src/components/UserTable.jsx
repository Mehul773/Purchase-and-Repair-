import React from "react";
import axios from "axios";

function UserTable(pc) {
  const Changestatus = async (event) => {
    event.preventDefault();
    console.log("click");
    axios
      .post("http://localhost:5000/pc/status", {
        email: pc.pc.email,
        status: pc.pc.status,
      })
      .then((res) => {
        window.location.reload("user/admin/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <tbody className="text-gray-600 text-sm font-light">
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium">{pc.pc.name}</span>
          </div>
        </td>
        <td className="py-3 px-6">
          <div>{pc.pc.email}</div>
        </td>
        <td className="py-3 px-6">
          <span className="text-red-500 rounded-full text-ls">
            {pc.pc.status}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center ">
            <div
              className="w-4 mr-2 transform hover:text-green-500 hover:scale-110"
              onClick={() => {
                console.log("i am click");
              }}
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>

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

            <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default UserTable;
