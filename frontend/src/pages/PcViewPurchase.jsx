import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import HeaderPc from "../components/HeaderPc";
import PcSidebarPurchase from "../components/PcSidebarPurchase";

const PcViewPurchase = () => {
  const [files, setFiles] = useState([]);
  const [department, setDepartment] = useState("");
  const [sr_no, setSr_No] = useState("");
  const [price, setPrice] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [description, setDescription] = useState("");
  const [bill_no, setBill_no] = useState("");
  const [po_no, setPO_no] = useState("");
  const [supplier, setSupplier] = useState("");
  const [all, setAll] = useState([]);
  const [item, setItem] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:5000/pc/downloadfile", {
      responseType: "blob",
      params: {
        department: department,
        sr_no: sr_no,
        price: price,
        academic_year: academic_year,
        description: description,
        bill_no: bill_no,
        po_no: po_no,
        supplier: supplier,
        item: item,
      },
    });
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
        return axios.get(`http://localhost:5000/pc/searchpurchase`, {
          withCredentials: true,
          params: {
            department: response.data.department,
            sr_no: sr_no,
            price: price,
            academic_year: academic_year,
            description: description,
            bill_no: bill_no,
            po_no: po_no,
            supplier: supplier,
            item: item,
          },
        });
      })
      .then((response) => {
        setFiles(response.data.files);
      });
  }, [
    department,
    sr_no,
    price,
    academic_year,
    description,
    bill_no,
    po_no,
    supplier,
    item,
  ]);

  return (
    <>
      <div>
        <HeaderPc />
        <PcSidebarPurchase />
        <div className="title-size text-color">Purchase data</div>
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
            name="price"
            placeholder="Enter Price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
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
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
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
          <input
            className="form-box-sm"
            type="text"
            name="po_no"
            placeholder="Enter PO No."
            value={po_no}
            onChange={(event) => {
              setPO_no(event.target.value);
            }}
          ></input>
          <input
            className="form-box-sm"
            type="text"
            name="item"
            placeholder="Enter Item"
            value={item}
            onChange={(event) => {
              setItem(event.target.value);
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
                    Download purchase file
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

export default PcViewPurchase;
