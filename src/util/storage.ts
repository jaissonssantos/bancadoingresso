import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string): Promise<void> =>
  AsyncStorage.setItem(key, value);

const getItem = async (key: string): Promise<string | null> =>
  AsyncStorage.getItem(key);

const removeItem = async (key: string): Promise<void> =>
  AsyncStorage.removeItem(key);

const keys = {
  AUTH_STATE: 'AUTH_STATE',
};

export const storage = {
  setItem,
  getItem,
  removeItem,
  keys,
};
