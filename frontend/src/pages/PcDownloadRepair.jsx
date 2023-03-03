import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import HeaderPc from "../components/HeaderPc";
import PcSidebarRepair from "../components/PcSidebarRepair";

const PcDownloadRepair = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      "http://localhost:5000/pc/downloadrepairfile",
      {
        responseType: "blob",
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

  return (
    <>
      <HeaderPc />
      <PcSidebarRepair />
      <div className="download-flex">
        <div>
          <p className="text-color text-size">Download purchase file</p>
        </div>
        <div>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <button type="submit" className="btn download-btn" role="button">
              Download Recurring File
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PcDownloadRepair;
