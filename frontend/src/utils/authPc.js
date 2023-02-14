import React from "react";
import { Navigate } from "react-router-dom";

const requireAuthu = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      if (localStorage.getItem("isPcLogged") !== "true") {
        return <WrappedComponent {...this.props} />;
      }
      return <Navigate to="/user/pc/dashboard" />;
    }
  };
};
export default requireAuthu;
