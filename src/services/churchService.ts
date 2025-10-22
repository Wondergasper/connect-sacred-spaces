// src/services/churchService.ts
import api from './api';

interface Church {
  _id: string;
  denomination: string;
  name: string;
  location: string;
  pastor: string;
  description: string;
  members: string[];
}

export const churchService = {
  getChurches: async (): Promise<Church[]> => {
    const response = await api.get('/church');
    return response.data;
  },

  getChurch: async (id: string): Promise<Church> => {
    const response = await api.get(`/church/${id}`);
    return response.data;
  },

  createChurch: async (churchData: Partial<Church>) => {
    const response = await api.post('/church', churchData);
    return response.data;
  },

  updateChurch: async (id: string, churchData: Partial<Church>) => {
    const response = await api.put(`/church/${id}`, churchData);
    return response.data;
  },

  deleteChurch: async (id: string) => {
    const response = await api.delete(`/church/${id}`);
    return response.data;
  },

  addMember: async (churchId: string, userId: string) => {
    const response = await api.post(`/church/${churchId}/members`, { userId });
    return response.data;
  },

  removeMember: async (churchId: string, userId: string) => {
    const response = await api.delete(`/church/${churchId}/members`, { data: { userId } });
    return response.data;
  }
};