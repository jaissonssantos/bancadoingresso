import { NativeModules } from 'react-native';

export const { PaymentModule } = NativeModules;

export const getAvailableInstallments = (value: number): string[] =>
  PaymentModule.getAvailableInstallments(value);

export const startPayment = async (
  value: number,
  installments: number = 1,
): Promise<string> => PaymentModule.startPayment(value, installments);

export const abortPayment = (): void => PaymentModule.abortPayment();

export const isAuthenticated = async (): Promise<boolean> =>
  await PaymentModule.isAuthenticated();
