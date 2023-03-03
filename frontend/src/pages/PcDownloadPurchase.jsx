import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import HeaderPc from "../components/HeaderPc";
import PcSidebarPurchase from "../components/PcSidebarPurchase";

const PcDownloadPurchase = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:5000/pc/downloadfile", {
      responseType: "blob",
    });
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
      <PcSidebarPurchase />
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
              Download purchase file
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PcDownloadPurchase;
