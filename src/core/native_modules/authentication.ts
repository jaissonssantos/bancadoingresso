import { NativeModules } from 'react-native';

const { AuthenticationModule } = NativeModules;

export const isAuthenticated = async (): Promise<boolean> => {
  return await AuthenticationModule.isAuthenticated();
};

export const initializeAndActivatePinpad = async (
  activationCode: string,
): Promise<number | string> => {
  return await AuthenticationModule.initializeAndActivatePinpad(activationCode);
};

export const deactivate = async (
  activationCode: string,
): Promise<number | string> => {
  return await AuthenticationModule.deactivate(activationCode);
};
