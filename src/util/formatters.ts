import type { Formatter } from 'src/hooks/useForm';

export const onlyInteger: Formatter = value => value.replace(/\D+/g, '');

export const phoneFormatter: Formatter = value => {
  if (!value) {
    return '';
  }

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
};

export const cepFormatter: Formatter = (value): string => {
  const numbers = onlyInteger(value);

  return numbers.replace(/^(\d{5})(\d)/, '$1-$2');
};

export const feeToNumber = (
  value: string | number | undefined | null,
): number => {
  if (!value) {
    return 0;
  }

  if (typeof value === 'string') {
    value = value.replace(',', '.');
    value = parseFloat(value).toFixed(2);

    const numbers = onlyInteger(value);

    return Number(numbers) / 100;
  }

  if (typeof value === 'number' && Number.isInteger(value)) {
    return value;
  }

  return Number(value);
};
