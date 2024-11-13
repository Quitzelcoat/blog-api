/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PublicRoute = ({ token, children }) => {
  return token ? <Navigate to='/' replace /> : children;
};

export default PublicRoute;
