import { StyleSheet } from 'react-native';
import { scale } from 'src/styleguide/scaling';

const stylesText = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: scale(5),
  },
  loadingContainer: {},
});

export { stylesText };
