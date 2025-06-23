import { fetchRates, convertFromUSD } from '../utils/currencyConverter.js';

export async function getRates(req, res) {
  try {
    const rates = await fetchRates();
    res.json({ rates });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch rates' });
  }
}

export async function convertCurrency(req, res) {
  const { amount, targetCurrency } = req.query;

  if (!amount || !targetCurrency) {
    return res.status(400).json({ error: 'Missing amount or targetCurrency' });
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    return res.status(400).json({ error: 'Amount must be a valid number' });
  }

  try {
    const convertedAmount = await convertFromUSD(numericAmount, targetCurrency);
    res.json({ convertedAmount });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Conversion failed' });
  }
}
