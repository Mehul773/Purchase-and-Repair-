import "./App.css";
import Header from "./components/Header";
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
import AdminApproval from "./pages/AdminApproval";
import PcDashboard from "./pages/PcDashboard";
import RequestPending from "./pages/RequestPending";
import DeanDashboard from "./pages/DeanDashboard";
import VerifyDean from "./pages/VerifyDean";

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
            <Route
              path="/user/admin/dashboard"
              element={<AdminApproval />}
            ></Route>
            <Route path="/user/pc/dashboard" element={<PcDashboard />}></Route>
            <Route path="/request" element={<RequestPending />}></Route>
            <Route path="/dean/dashboard" element={<DeanDashboard />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
