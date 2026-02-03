import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming user info is in Redux

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.userData); // your auth slice
  const role =useSelector((state) => state.auth.role);
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // Logged in & role allowed
  return children;
};

export default ProtectedRoute;
