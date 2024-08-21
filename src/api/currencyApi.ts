const API_KEY = '6bf98180e29eff9b430d9f71';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

import { fetchCountryCurrencyMap } from '@/api/countryApi';

let countryToCurrencyMap: { [key: string]: string } = {};

export async function fetchCurrencies(): Promise<{ [key: string]: string }> {
  try {
    const response = await fetch(`${BASE_URL}/USD`);
    if (!response.ok) {
      throw new Error(`Error fetching currency data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.conversion_rates; 
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch currencies.');
  }
}

export async function getExchangeRate(base: string, target: string): Promise<number> {
  try {
    const response = await fetch(`${BASE_URL}/${base}`);
    if (!response.ok) {
      throw new Error(`Error fetching exchange rate data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.conversion_rates[target];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch exchange rate.');
  }
}

export async function getDefaultCurrency(): Promise<string> {
  try {
    if (Object.keys(countryToCurrencyMap).length === 0) {
      countryToCurrencyMap = await fetchCountryCurrencyMap();
    }

    const locale = navigator.language || navigator.languages[0];
    const countryCode = locale.split('-')[1] || locale;
    console.log(countryToCurrencyMap, countryCode)
    return countryToCurrencyMap[countryCode] || 'USD';
  } catch (error) {
    console.error(error);
    return 'USD';
  }
}