import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface RoleBasedRedirectProps {
  children: React.ReactNode;
}

const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ children }) => {
  const { state } = useAuth();
  const location = useLocation();

  // If user is authenticated, redirect based on role
  if (state.isAuthenticated) {
    // If user is admin or pastor, redirect to admin dashboard
    if (state.user?.role === 'admin' || state.user?.role === 'pastor') {
      // But don't redirect if they're already on admin dashboard or a subpage
      if (!location.pathname.startsWith('/admin-dashboard')) {
        return <Navigate to="/admin-dashboard" replace />;
      }
    } else {
      // Regular members go to member dashboard
      // But don't redirect if they're already on dashboard or a subpage
      if (!location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin-dashboard')) {
        return <Navigate to="/dashboard" replace />;
      }
    }
  }

  // If not authenticated, render children (which will typically be a login page)
  return <>{children}</>;
};

export default RoleBasedRedirect;