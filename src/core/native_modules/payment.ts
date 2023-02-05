import { NativeModules } from 'react-native';

export const { PaymentModule } = NativeModules;

export const startPayment = async (
  value: number,
  installments: number = 1,
): Promise<string> => PaymentModule.startPayment(value, installments);

export const isAuthenticated = async (): Promise<boolean> => {
  return await PaymentModule.isAuthenticated();
};
