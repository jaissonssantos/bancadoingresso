import type { ViewStyle } from 'react-native';
import { selectByPlatform } from 'src/util/platform';
import { Colors } from './colors';

export const shadowStyle: ViewStyle = {
  ...selectByPlatform({
    android: {
      borderWidth: 1,
      borderColor: Colors.blackLight,
    },
    default: {},
  }),
  shadowColor: Colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
