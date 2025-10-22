// src/services/donationService.ts
import api from './api';

interface Donation {
  _id: string;
  amount: number;
  donor: string;
  church: string;
  donationType: 'tithe' | 'offering' | 'thanksgiving' | 'project';
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  paymentProvider: string;
}

interface DonationStats {
  totalStats: {
    totalAmount: number;
    totalCount: number;
    averageAmount: number;
  };
  byType: {
    _id: string;
    totalAmount: number;
    count: number;
  }[];
}

export const donationService = {
  getDonations: async (): Promise<Donation[]> => {
    const response = await api.get('/donations');
    return response.data;
  },

  getDonation: async (id: string): Promise<Donation> => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },

  createDonation: async (donationData: Partial<Donation>) => {
    const response = await api.post('/donations', donationData);
    return response.data;
  },

  updateDonation: async (id: string, donationData: Partial<Donation>) => {
    const response = await api.put(`/donations/${id}`, donationData);
    return response.data;
  },

  deleteDonation: async (id: string) => {
    const response = await api.delete(`/donations/${id}`);
    return response.data;
  },

  getDonationStats: async (): Promise<DonationStats> => {
    const response = await api.get('/donations/stats');
    return response.data;
  }
};