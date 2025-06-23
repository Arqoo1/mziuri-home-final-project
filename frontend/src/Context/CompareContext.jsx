import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev; 
      if (prev.length >= 3) return prev; 
      return [...prev, product];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
