import React, { createContext, useState, useContext, useEffect } from 'react';

const SuperAccessContext = createContext();

export const useSuperAccess = () => {
  const context = useContext(SuperAccessContext);
  if (!context) {
    throw new Error('useSuperAccess must be used within a SuperAccessProvider');
  }
  return context;
};

export const SuperAccessProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hardcoded super credentials
  const SUPER_ID = 'supersuper';
  const SUPER_PASSWORD = 'Supernova_01';
  const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    // Check if super access is valid on mount
    checkSuperAccess();
  }, []);

  const checkSuperAccess = () => {
    const superAccessData = localStorage.getItem('nextec_super_access');

    if (superAccessData) {
      try {
        const { timestamp } = JSON.parse(superAccessData);
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - timestamp;

        // Check if session is still valid (within 1 hour)
        if (timeDiff < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('nextec_super_access');
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem('nextec_super_access');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  const login = (id, password) => {
    if (id === SUPER_ID && password === SUPER_PASSWORD) {
      const accessData = {
        timestamp: new Date().getTime(),
        authenticated: true
      };
      localStorage.setItem('nextec_super_access', JSON.stringify(accessData));
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid super access credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('nextec_super_access');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <SuperAccessContext.Provider value={value}>
      {children}
    </SuperAccessContext.Provider>
  );
};
