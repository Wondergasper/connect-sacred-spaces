// src/context/ApiContext.tsx
import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { churchService } from '../services/churchService';
import { eventService } from '../services/eventService';
import { donationService } from '../services/donationService';
import { mediaService } from '../services/mediaService';
import { groupService } from '../services/groupService';
import { dashboardService } from '../services/dashboardService';

// Define the context type
interface ApiContextType {
  authService: typeof authService;
  churchService: typeof churchService;
  eventService: typeof eventService;
  donationService: typeof donationService;
  mediaService: typeof mediaService;
  groupService: typeof groupService;
  dashboardService: typeof dashboardService;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Create the provider component
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ApiContext.Provider value={{
      authService,
      churchService,
      eventService,
      donationService,
      mediaService,
      groupService,
      dashboardService
    }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};