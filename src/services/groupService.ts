// src/services/groupService.ts
import api from './api';

interface Group {
  _id: string;
  name: string;
  description: string;
  church: string;
  createdBy: string;
  members: string[];
  admins: string[];
  privacy: 'public' | 'private' | 'secret';
  category: string;
  isVerified: boolean;
}

export const groupService = {
  getGroups: async (churchId?: string): Promise<Group[]> => {
    const response = await api.get('/groups', {
      params: { churchId }
    });
    return response.data;
  },

  getGroup: async (id: string): Promise<Group> => {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },

  createGroup: async (groupData: Partial<Group>) => {
    const response = await api.post('/groups', groupData);
    return response.data;
  },

  updateGroup: async (id: string, groupData: Partial<Group>) => {
    const response = await api.put(`/groups/${id}`, groupData);
    return response.data;
  },

  deleteGroup: async (id: string) => {
    const response = await api.delete(`/groups/${id}`);
    return response.data;
  },

  joinGroup: async (id: string) => {
    const response = await api.post(`/groups/${id}/join`);
    return response.data;
  },

  leaveGroup: async (id: string) => {
    const response = await api.post(`/groups/${id}/leave`);
    return response.data;
  },

  addAdmin: async (id: string, userId: string) => {
    const response = await api.post(`/groups/${id}/admins`, { userId });
    return response.data;
  }
};