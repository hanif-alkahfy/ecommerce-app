import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Cek token di localStorage
  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  // Jika tidak ada token atau user data, redirect ke login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada token dan user data, render children component
  return children;
}
