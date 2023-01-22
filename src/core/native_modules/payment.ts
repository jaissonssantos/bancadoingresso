import { NativeModules } from 'react-native';

export const { PaymentModule } = NativeModules;

export const startPayment = (): void => {
  PaymentModule.startPayment();
};

export const isAuthenticated = async (): Promise<boolean> => {
  return await PaymentModule.isAuthenticated();
};
