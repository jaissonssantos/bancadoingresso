export const waitFor = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const calculateFees = (value: number, percentage: number): number => {
  const percentageValue = percentage / 100;
  const result = value * percentageValue;

  return value + result;
};
