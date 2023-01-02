import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import Decimal from 'decimal.js';
import currency from 'currency.js';

interface IFormatValueToCurrency {
  masked: string;
  maskedWithoutUnit: string;
}

export const convertAmountToNumber = (amount: string): number =>
  Number(amount.replace(/[^0-9]+/g, ''));

export const formatCurrency = (price: number | string): string =>
  currency(typeof price === 'string' ? parseInt(price, 10) : price, {
    symbol: 'R$ ',
    separator: '.',
    decimal: ',',
  }).format();

export const removeSpecialCharacters = (value: string): string =>
  String(value).replace(/\D/g, '');

export const formatValueToCurrency = (
  value: string,
): IFormatValueToCurrency => {
  const prefix = Number(value) < 0 ? '-' : '';

  // const valueNumeric = value ? Number(removeSpecialCharacters(value)) : 0;

  // const valueNumericInCents = valueNumeric / 100;

  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const finalCurrencyValue = formatter.format(Number(value));

  return {
    masked: `R$ ${prefix}${finalCurrencyValue}`,
    maskedWithoutUnit: `${prefix}${finalCurrencyValue}`,
  };
};

export const toFloat = (amount: number): string =>
  new Decimal(amount).dividedBy(100).toFixed(2);

export const toInteger = (amountInReals: string): number =>
  new Decimal(amountInReals).times(100).toNumber();

export const toCents = (amountInReals: number): number =>
  new Decimal(amountInReals).times(100).toNumber();

export const toPercentage = (amount: number): string => {
  const option = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const { format } = new Intl.NumberFormat('pt-BR', option);

  return format(amount);
};

export const toString = (
  amountInCents: number | string,
  { withSign } = { withSign: true },
): string => {
  let result = '';
  if (withSign) {
    result = formatValueToCurrency(String(amountInCents)).masked;
  } else {
    result = formatValueToCurrency(String(amountInCents)).maskedWithoutUnit;
  }

  return result;
};
