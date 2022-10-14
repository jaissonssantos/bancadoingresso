import Config, { NativeConfig } from 'react-native-config';

interface EnvVariables extends NativeConfig {
  API_URL: string;
  GOOGLE_WEB_CLIENT_ID: string;
}

export const EnvVariables = Config as EnvVariables;
