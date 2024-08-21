const BASE_URL = 'https://restcountries.com/v3.1/all';

export async function fetchCountryCurrencyMap(): Promise<{ [key: string]: string }> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error fetching country data: ${response.statusText}`);
    }

    const countries = await response.json();
    const countryToCurrency: { [key: string]: string } = {};

    countries.forEach((country: any) => {
      if (country.currencies) {
        const currencyCodes = Object.keys(country.currencies);
        const currencyCode = currencyCodes[0]; 
        const countryCode = country.cca2;
        countryToCurrency[countryCode] = currencyCode;
      }
    });

    return countryToCurrency;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch country currency map.');
  }
}
