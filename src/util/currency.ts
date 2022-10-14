import currency from 'currency.js';

export const formatCurrency = (price: number | string): string =>
  currency(typeof price === 'string' ? parseFloat(price) : price, {
    symbol: 'R$ ',
    separator: '.',
    decimal: ',',
  }).format();
