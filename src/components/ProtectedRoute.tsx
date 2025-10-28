import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  canAccessMembersPage, 
  canAccessEventsPage, 
  canAccessDonationsPage, 
  canAccessAnalyticsPage, 
  canAccessAdminPage,
  canAccessDepartmentsPage
} from '@/utils/roleUtils';

interface ProtectedRouteProps {
  children: ReactElement;
  requireAuth?: boolean;
  pageType?: 'dashboard' | 'memberDashboard' | 'members' | 'events' | 'donations' | 'admin' | 'adminDashboard' | 'analytics' | 'departments';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  pageType,
}) => {
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  // If authentication is required but user is not logged in
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authentication is not required but user is logged in, redirect away from public pages
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check for specific page access requirements
  if (pageType && user) {
    let hasAccess = false;
    let redirectPath = null;

    switch (pageType) {
      case 'members':
        hasAccess = canAccessMembersPage(user);
        break;
      case 'events':
        hasAccess = canAccessEventsPage(user);
        break;
      case 'donations':
        hasAccess = canAccessDonationsPage(user);
        break;
      case 'admin':
        hasAccess = canAccessAdminPage(user);
        break;
      case 'analytics':
        hasAccess = canAccessAnalyticsPage(user);
        break;
      case 'departments':
        hasAccess = canAccessDepartmentsPage(user);
        break;
      case 'dashboard':
        hasAccess = isAuthenticated;
        break;
      case 'memberDashboard':
        // Only allow non-admin users to access member dashboard
        hasAccess = isAuthenticated && user.role !== 'admin' && user.role !== 'pastor';
        // If admin tries to access member dashboard, redirect to admin dashboard
        if (isAuthenticated && (user.role === 'admin' || user.role === 'pastor')) {
          redirectPath = '/admin-dashboard';
        }
        break;
      case 'adminDashboard':
        // Only allow admin users to access admin dashboard
        hasAccess = isAuthenticated && (user.role === 'admin' || user.role === 'pastor');
        // If non-admin tries to access admin dashboard, redirect to member dashboard
        if (isAuthenticated && user.role !== 'admin' && user.role !== 'pastor') {
          redirectPath = '/dashboard';
        }
        break;
      default:
        hasAccess = isAuthenticated;
    }

    if (!hasAccess) {
      // If user doesn't have permission for specific page, redirect to dashboard
      return <Navigate to={redirectPath || "/dashboard"} replace />;
    } else if (redirectPath) {
      // If there's a redirect path based on role, redirect to the appropriate dashboard
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;