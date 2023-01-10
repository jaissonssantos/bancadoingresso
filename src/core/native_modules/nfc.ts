import { NativeModules } from 'react-native';

const { NFCModule } = NativeModules;

export const beepNFC = (): void => {
  NFCModule.beepNFC();
};

export const readNFCCard = async (): Promise<void> => {
  const result = await NFCModule.readNFCCard();

  console.log('result >>>', result);
};
