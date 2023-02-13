import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChooseS from "./pages/ChooseS";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUpDean from "./pages/SignUpDean";
import SignUpHod from "./pages/SignUpHod";
import SignUpPc from "./pages/SignUpPc";
import LoginAdmin from "./pages/LoginAdmin";
import LoginDean from "./pages/LoginDean";
import LoginHod from "./pages/LoginHod";
import LoginPc from "./pages/LoginPc";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
            <Route path="/chooses" element={<ChooseS></ChooseS>}></Route>
            <Route path="/choosel" element={<ChooseS></ChooseS>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signUpDean" element={<SignUpDean></SignUpDean>}></Route>
            <Route path="/signUpHod" element={<SignUpHod></SignUpHod>}></Route>
            <Route path="/SignUpPc" element={<SignUpPc></SignUpPc>}></Route>
            <Route path="/LoginAdmin" element={<LoginAdmin></LoginAdmin>}></Route>
            <Route path="/LoginDean" element={<LoginDean></LoginDean>}></Route>
            <Route path="/LoginHod" element={<LoginHod></LoginHod>}></Route>
            <Route path="/LoginPc" element={<LoginPc></LoginPc>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
