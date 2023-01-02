import Config, { NativeConfig } from 'react-native-config';

interface EnvVariables extends NativeConfig {
  API_URL: string;
}

export const Env = Config as EnvVariables;
export const IS_DEBUG = __DEV__;
