// src/utils/roleUtils.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string; // 'superadmin', 'denomination-admin', 'pastor', 'admin', 'deacon', 'leader', 'member', 'volunteer'
  church: string;
  denomination: string;
}

export const userHasRole = (user: User | null, requiredRole: string): boolean => {
  if (!user) return false;
  return user.role === requiredRole;
};

export const userHasAnyRole = (user: User | null, requiredRoles: string[]): boolean => {
  if (!user) return false;
  return requiredRoles.includes(user.role);
};

export const canAccessMembersPage = (user: User | null): boolean => {
  if (!user) return false;
  // Pastors, Admins, Deacons, and Leaders can access members page
  return ['pastor', 'admin', 'deacon', 'leader'].includes(user.role);
};

export const canAccessEventsPage = (user: User | null): boolean => {
  if (!user) return false;
  // All logged-in users can access events page
  return true;
};

export const canAccessDonationsPage = (user: User | null): boolean => {
  if (!user) return false;
  // All logged-in users can access donations page
  return true;
};

export const canAccessAnalyticsPage = (user: User | null): boolean => {
  if (!user) return false;
  // Only pastors and admins can access analytics
  return ['superadmin', 'denomination-admin', 'pastor', 'admin'].includes(user.role);
};

export const canAccessAdminPage = (user: User | null): boolean => {
  if (!user) return false;
  // Super admins, denomination admins, pastors and church admins can access admin page
  return ['superadmin', 'denomination-admin', 'pastor', 'admin'].includes(user.role);
};

export const canAccessCommunity = (user: User | null): boolean => {
  if (!user) return false;
  // All logged-in users can access community
  return true;
};

export const canAccessExplore = (): boolean => {
  // Anyone can access explore (public content)
  return true;
};

export const canAccessChurchPortal = (user: User | null): boolean => {
  if (!user) return false;
  // All logged-in users can access church portal (dashboard)
  return true;
};

export const canAccessDepartmentsPage = (user: User | null): boolean => {
  if (!user) return false;
  // Pastors and admins can access departments page
  return ['pastor', 'admin'].includes(user.role);
};

export const canCreateGroups = (user: User | null): boolean => {
  if (!user) return false;
  // All logged-in users can create groups
  return true;
};

export const canAccessChat = (user: User | null): boolean => {
  if (!user) return false;
  // All logged-in users can access chat
  return true;
};

export const hasPermissionForAction = (user: User | null, action: string): boolean => {
  if (!user) return false;

  switch (action) {
    case 'create_event':
    case 'edit_event':
    case 'delete_event':
      return ['pastor', 'admin', 'deacon', 'leader'].includes(user.role);

    case 'create_announcement':
    case 'edit_announcement':
    case 'delete_announcement':
      return ['pastor', 'admin', 'deacon', 'leader'].includes(user.role);

    case 'manage_members':
      return ['pastor', 'admin', 'deacon', 'leader'].includes(user.role);

    case 'view_financial_reports':
      return ['superadmin', 'denomination-admin', 'pastor', 'admin'].includes(user.role);

    case 'manage_donations':
      return ['superadmin', 'denomination-admin', 'pastor', 'admin'].includes(user.role);

    case 'create_content':
      return ['pastor', 'admin', 'deacon', 'leader', 'member'].includes(user.role);

    default:
      return false;
  }
};

export const getDashboardRedirectPath = (user: User | null): string => {
  if (!user) return '/auth';
  
  // If user is admin or pastor, redirect to admin dashboard
  if (user.role === 'admin' || user.role === 'pastor') {
    return '/admin-dashboard';
  }
  // Otherwise, redirect to member dashboard
  return '/dashboard';
};