import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Children: ReactComponent }) => {
    const token = localStorage.getItem("jwt") || "";
    console.log({ token });
    return token ? (
        <ReactComponent authUser={true} />
    ) : (
        <Navigate to="/home" />
    );
};

export default PrivateRoute;