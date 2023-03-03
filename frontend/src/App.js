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
import PcUpload from "./pages/PcUpload";
import PcDownload from "./pages/PcDownload";
import PcAddSupplier from "./pages/PcAddSupplier";
import PcUploadPurchase from "./pages/PcUploadPurchase";
import PcDownloadPurchase from "./pages/PcDownloadPurchase";
import PcUploadRepair from "./pages/PcUploadRepair";
import PcDownloadRepair from "./pages/PcDownloadRepair";
import PcView from "./pages/PcView";
import PcViewPurchase from "./pages/PcViewPurchase";
import PcViewRepair from "./pages/PcViewRepair";
import PcForm from "./pages/PcForm";
import PcFormPurchase from "./pages/PcFormPurchase";
import PcFormRepair from "./pages/PcFormRepair";

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

            <Route path="/pc/upload" element={<PcUpload />}></Route>
            <Route path="/pc/download" element={<PcDownload />}></Route>
            <Route path="/pc/addsupp" element={<PcAddSupplier />}></Route>

            <Route
              path="/pc/upload/purchase"
              element={<PcUploadPurchase />}
            ></Route>
            <Route
              path="/pc/upload/repair"
              element={<PcUploadRepair />}
            ></Route>

            <Route
              path="/pc/download/purchase"
              element={<PcDownloadPurchase />}
            ></Route>
            <Route
              path="/pc/download/repair"
              element={<PcDownloadRepair />}
            ></Route>

            <Route path="/pc/view" element={<PcView />}></Route>
            <Route
              path="/pc/view/purchase"
              element={<PcViewPurchase />}
            ></Route>
            <Route path="/pc/view/repair" element={<PcViewRepair />}></Route>

            <Route path="/pc/form" element={<PcForm />}></Route>
            <Route path="/pc/form/purchase" element={<PcFormPurchase />}></Route>
            <Route path="/pc/form/repair" element={<PcFormRepair />}></Route>
            
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
