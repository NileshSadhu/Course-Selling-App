import { Children, useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return Children;
};

export default ProtectedRoute;
