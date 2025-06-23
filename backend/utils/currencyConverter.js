import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

let exchangeRates = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour cache

export async function fetchRates() {
  const now = Date.now();
  if (exchangeRates && now - lastFetchTimestamp < CACHE_DURATION_MS) {
    return exchangeRates;
  }

  const url = `https://v6.exchangerate-api.com/v6/2c43cd96ccc50e2a0a2bb6da/latest/USD`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.result === "success") {
    exchangeRates = data.conversion_rates;
    lastFetchTimestamp = now;
    return exchangeRates;
  } else {
    throw new Error("Failed to fetch exchange rates");
  }
}

export async function convertFromUSD(amount, targetCurrency) {
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Amount must be a positive number");
  }
  const rates = await fetchRates();
  const rate = rates[targetCurrency.toUpperCase()];
  if (!rate) {
    throw new Error(`Unsupported currency: ${targetCurrency}`);
  }
  const convertedAmount = amount * rate;
  console.log(
    "Converting:",
    amount,
    "to",
    targetCurrency,
    "Result:",
    convertedAmount
  );
  return convertedAmount;
}
