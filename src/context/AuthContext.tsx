import React, { createContext, useContext, useReducer } from 'react';

// Define types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  church: string;
  denomination: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  currentDenomination: string;
  loading: boolean;
}

interface AuthAction {
  type: string;
  payload?: any;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  currentDenomination: 'rccg', // Default denomination
  loading: false,
};

// Auth context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'SET_CURRENT_DENOMINATION':
      return {
        ...state,
        currentDenomination: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};