import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userSession = localStorage.getItem("user_session");

  // If user is not logged in, redirect to auth page
  if (!userSession) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
