import type { Installment } from 'src/features/cart/model/installmentDTO';

export const formatInstallments = (installments: number[]): Installment[] => {
  return installments.map((installment, index) => ({
    value: installment / 100,
    quantity: index + 1,
    isInterest: false,
  }));
};
