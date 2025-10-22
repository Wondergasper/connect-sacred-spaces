// src/services/mediaService.ts
import api from './api';

interface Media {
  _id: string;
  title: string;
  description: string;
  type: 'sermon' | 'book' | 'music' | 'image' | 'video';
  url: string;
  thumbnail: string;
  duration: string;
  size: number;
  church: string;
  uploadedBy: string;
  isPublic: boolean;
  category: string;
}

export const mediaService = {
  getMedia: async (churchId?: string): Promise<Media[]> => {
    const response = await api.get('/media', {
      params: { churchId }
    });
    return response.data;
  },

  getMediaById: async (id: string): Promise<Media> => {
    const response = await api.get(`/media/${id}`);
    return response.data;
  },

  createMedia: async (mediaData: Partial<Media>) => {
    const response = await api.post('/media', mediaData);
    return response.data;
  },

  updateMedia: async (id: string, mediaData: Partial<Media>) => {
    const response = await api.put(`/media/${id}`, mediaData);
    return response.data;
  },

  deleteMedia: async (id: string) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },

  getPublicMedia: async (): Promise<Media[]> => {
    const response = await api.get('/media/public');
    return response.data;
  }
};