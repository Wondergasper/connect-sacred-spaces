// src/services/eventService.ts
import api from './api';

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  church: string;
  createdBy: string;
  isPublic: boolean;
  attendees: string[];
}

export const eventService = {
  getEvents: async (churchId?: string): Promise<Event[]> => {
    const response = await api.get('/events', {
      params: { churchId }
    });
    return response.data;
  },

  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData: Partial<Event>) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (id: string, eventData: Partial<Event>) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  rsvpEvent: async (id: string) => {
    const response = await api.post(`/events/${id}/rsvp`);
    return response.data;
  }
};