import { StyleSheet } from 'react-native';
import { scale } from 'src/styleguide/scaling';

const stylesText = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scale(45),
  },
  text: {
    marginLeft: scale(5),
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { stylesText };
