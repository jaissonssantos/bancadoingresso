import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const selectByPlatform = Platform.select;

export { selectByPlatform, isIOS, isAndroid };
