import React, { createContext, useContext, useReducer } from 'react';

// Create the context
const GlobalContext = createContext();

// Reducer for state updates
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.payload)
      return { ...state, token: action.payload };
    case 'SET_USERID':
      localStorage.setItem('userId', action.payload)
      return { ...state, userId: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    token: localStorage.getItem('token'),
    userID: localStorage.getItem('userId')
  });

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
