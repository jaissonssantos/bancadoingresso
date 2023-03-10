import { NativeModules } from 'react-native';
import { Env } from 'src/constants/env';
import { PAYMENT_TYPES } from 'src/features/cart/types';

export const { PaymentModule } = NativeModules;

export const getAvailableInstallments = (value: number): string[] =>
  PaymentModule.getAvailableInstallments(value);

export const startPayment = async (
  value: number,
  installments: number = 1,
  type: PAYMENT_TYPES = PAYMENT_TYPES.TYPE_CREDITO,
  user_reference: string = Env.USER_REFERENCE,
): Promise<string> =>
  PaymentModule.startPayment(value, installments, type, user_reference);

export const abortPayment = (): void => PaymentModule.abortPayment();
