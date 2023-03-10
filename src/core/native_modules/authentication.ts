import { NativeModules } from 'react-native';

const { AuthenticationModule } = NativeModules;

export const isAuthenticated = async (): Promise<{
  id: string | null;
  terminalSerialNumber: string | null;
  enabled: boolean;
}> => {
  return await AuthenticationModule.isAuthenticated();
};

export const initializeAndActivatePinPad = async (
  activationCode: string,
): Promise<number | string> => {
  return await AuthenticationModule.initializeAndActivatePinPad(activationCode);
};

export const deactivate = async (
  activationCode: string,
): Promise<number | string> => {
  return await AuthenticationModule.deactivate(activationCode);
};
