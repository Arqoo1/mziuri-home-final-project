import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRates } from '../api/currencyapi';

const CurrencyContext = createContext();

const symbols = {
  USD: '$',
  EUR: '€',
  GEL: '₾',
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');
  const [rates, setRates] = useState({ USD: 1 });

  useEffect(() => {
    async function loadRates() {
      try {
        const data = await fetchRates();
        setRates(data);
      } catch (err) {
        console.error('Failed to load currency rates:', err);
      }
    }
    loadRates();
  }, []);

  const convert = (usdAmount) => {
    const rate = rates[currency] || 1;
    return (usdAmount * rate).toFixed(2);
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const symbol = symbols[currency] || '';

  return (
    <CurrencyContext.Provider value={{ currency, rates, convert, changeCurrency, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
