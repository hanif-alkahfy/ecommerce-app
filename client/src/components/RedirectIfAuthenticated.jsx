import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
  // Check if user is authenticated by checking for token
  const isAuthenticated = localStorage.getItem("accessToken");

  // If authenticated, redirect to homepage
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the children (login/register page)
  return children;
}
