import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpDean from "./pages/SignUpDean";
import SignUpHod from "./pages/SignUpHod";
import SignUpPc from "./pages/SignUpPc";
import LoginAdmin from "./pages/LoginAdmin";
import LoginDean from "./pages/LoginDean";
import LoginHod from "./pages/LoginHod";
import LoginPc from "./pages/LoginPc";
import AdminDashboard from "./pages/AdminDashboard";
import PcDashboard from "./pages/PcDashboard";
import DeanDashboard from "./pages/DeanDashboard";
import HodDashboard from "./pages/HodDashboard";
import PcUploadPurchase from "./pages/PcUploadPurchase";
import PcDownloadPurchase from "./pages/PcDownloadPurchase";
import PcUploadRepair from "./pages/PcUploadRepair";
import PcDownloadRepair from "./pages/PcDownloadRepair";
import PcViewPurchase from "./pages/PcViewPurchase";
import PcViewRepair from "./pages/PcViewRepair";
import PcFormPurchase from "./pages/PcFormPurchase";
import PcFormRepair from "./pages/PcFormRepair";
import PcAddSupplierPurchase from "./pages/PcAddSupplierPurchase";
import PcAddSupplierRepair from "./pages/PcAddSupplierRepair";

import DeanDownloadPurchase from "./pages/DeanDownloadPurchase";
import DeanDownloadRepair from "./pages/DeanDownloadRepair";
import DeanViewPurchase from "./pages/DeanViewPurchase";
import DeanViewRepair from "./pages/DeanViewRepair";

import HodDownloadPurchase from "./pages/HodDownloadPurchase";
import HodDownloadRepair from "./pages/HodDownloadRepair";
import HodViewPurchase from "./pages/HodViewPurchase";
import HodViewRepair from "./pages/HodViewRepair";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>

            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/signup/dean"
              element={<SignUpDean></SignUpDean>}
            ></Route>
            <Route path="/signup/hod" element={<SignUpHod></SignUpHod>}></Route>
            <Route path="/signup/pc" element={<SignUpPc></SignUpPc>}></Route>
            <Route
              path="/login/admin"
              element={<LoginAdmin></LoginAdmin>}
            ></Route>
            <Route path="/login/dean" element={<LoginDean></LoginDean>}></Route>
            <Route path="/login/hod" element={<LoginHod></LoginHod>}></Route>
            <Route path="/login/pc" element={<LoginPc></LoginPc>}></Route>

            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route path="/pc/dashboard" element={<PcDashboard />}></Route>
            <Route path="/dean/dashboard" element={<DeanDashboard />}></Route>
            <Route path="/hod/dashboard" element={<HodDashboard />}></Route>

            <Route
              path="/pc/purchase"
              element={<PcAddSupplierPurchase />}
            ></Route>
            <Route path="/pc/repair" element={<PcAddSupplierRepair />}></Route>

            <Route
              path="/pc/purchase/upload"
              element={<PcUploadPurchase />}
            ></Route>
            <Route
              path="/pc/repair/upload"
              element={<PcUploadRepair />}
            ></Route>

            <Route
              path="/pc/purchase/download"
              element={<PcDownloadPurchase />}
            ></Route>
            <Route
              path="/pc/repair/download"
              element={<PcDownloadRepair />}
            ></Route>

            <Route
              path="/pc/purchase/view"
              element={<PcViewPurchase />}
            ></Route>
            <Route path="/pc/repair/view" element={<PcViewRepair />}></Route>

            <Route
              path="/pc/purchase/form"
              element={<PcFormPurchase />}
            ></Route>
            <Route path="/pc/repair/form" element={<PcFormRepair />}></Route>

            {/* dean*/}

            <Route path="/dean/purchase" element={<DeanViewPurchase />}></Route>
            <Route path="/dean/repair" element={<DeanViewRepair />}></Route>

            <Route
              path="/dean/purchase/download"
              element={<DeanDownloadPurchase />}
            ></Route>
            <Route
              path="/dean/repair/download"
              element={<DeanDownloadRepair />}
            ></Route>

            <Route path="/hod/purchase" element={<HodViewPurchase />}></Route>
            <Route path="/hod/repair" element={<HodViewRepair />}></Route>

            <Route
              path="/hod/purchase/download"
              element={<HodDownloadPurchase />}
            ></Route>
            <Route
              path="/hod/repair/download"
              element={<HodDownloadRepair />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
