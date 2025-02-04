import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  theme: 'light',
  gallery: {
    images: [],
    loading: false,
    error: null
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOAD_IMAGES_START':
      return { ...state, gallery: { ...state.gallery, loading: true } };
    case 'LOAD_IMAGES_SUCCESS':
      return { ...state, gallery: { images: action.payload, loading: false, error: null } };
    case 'LOAD_IMAGES_FAILURE':
      return { ...state, gallery: { ...state.gallery, loading: false, error: action.payload } };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext); 