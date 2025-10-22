// src/services/dashboardService.ts
import api from './api';

interface DashboardStats {
  activeMembers: number;
  upcomingEvents: number;
  monthlyDonations: number;
  newGroups: number;
}

interface DashboardData {
  upcomingEvents: any[];
  recentMedia: any[];
  groups: any[];
}

export const dashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get('/dashboard');
    return response.data;
  }
};