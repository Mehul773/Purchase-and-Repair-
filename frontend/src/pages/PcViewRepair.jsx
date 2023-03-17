import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import HeaderPc from "../components/HeaderPc";
import PcSidebarRepair from "../components/PcSidebarRepair";

const PcViewRepair = () => {
  const [files, setFiles] = useState([]);
  const [department, setDepartment] = useState("");
  const [sr_no, setSr_No] = useState("");
  const [bill_no, setBill_no] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [supplier, setSupplier] = useState("");
  const [all, setAll] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      "http://localhost:5000/pc/downloadrepairfile",
      {
        responseType: "blob",
        params: {
          department: department,
          sr_no: sr_no,
          academic_year: academic_year,
          bill_no: bill_no,
          supplier: supplier,
        },
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${Date.now()}` + "test.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/pc/getsupp", {
        withCredentials: true,
      })
      .then((response) => {
        setAll(response.data.supp);
        return axios.get("http://localhost:5000/pc/getme", {
          withCredentials: true,
        });
      })
      .then((response) => {
        setDepartment(response.data.department);
        return axios.get(`http://localhost:5000/pc/searchrepair`, {
          withCredentials: true,
          params: {
            department: department,
            sr_no: sr_no,
            academic_year: academic_year,
            bill_no: bill_no,
            supplier: supplier,
          },
        });
      })
      .then((response) => {
        setFiles(response.data.files);
      });
  }, [department, sr_no, academic_year, bill_no, supplier]);

  return (
    <>
      <div>
        <HeaderPc />
        <PcSidebarRepair />
        <div className="title-size text-color">Recurring data</div>
        <div>
          <input
            className="form-box-sm"
            type="text"
            name="sr_no"
            placeholder="Enter sr_no"
            value={sr_no}
            onChange={(event) => {
              setSr_No(event.target.value);
            }}
          ></input>
          <input
            className="form-box-sm"
            type="text"
            name="academic_year"
            placeholder="Enter Academic Year in yyyy-yy fromat"
            value={academic_year}
            onChange={(event) => {
              setAcademicYear(event.target.value);
            }}
          ></input>
          <input
            className="form-box-sm"
            type="text"
            name="bill_no"
            placeholder="Enter Bill no."
            value={bill_no}
            onChange={(event) => {
              setBill_no(event.target.value);
            }}
          ></input>
          <select
            className="form-dropdown-sm"
            value={supplier}
            onChange={(event) => {
              // console.log(event.target.value);
              if (event.target.value === "Select supplier") {
                setSupplier("");
              } else {
                setSupplier(event.target.value);
              }
            }}
          >
            <option>Select supplier</option>
            {all.map((supp) => (
              <option key={supp.supplier}>{supp.supplier}</option>
            ))}
          </select>
        </div>
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
            <div className="download-flex">
              <div>
                <form
                  onSubmit={(event) => {
                    handleSubmit(event);
                  }}
                >
                  <button
                    type="submit"
                    className="btn download-btn"
                    role="button"
                  >
                    Download repair file
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PcViewRepair;
