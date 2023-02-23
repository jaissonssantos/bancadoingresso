import { NativeModules } from 'react-native';
import { PAYMENT_TYPES } from 'src/features/cart/types';

export const { PaymentModule } = NativeModules;

export const getAvailableInstallments = (value: number): string[] =>
  PaymentModule.getAvailableInstallments(value);

export const startPayment = async (
  value: number,
  installments: number = 1,
  type: PAYMENT_TYPES = PAYMENT_TYPES.TYPE_CREDITO,
): Promise<string> => PaymentModule.startPayment(value, installments, type);

export const abortPayment = (): void => PaymentModule.abortPayment();
