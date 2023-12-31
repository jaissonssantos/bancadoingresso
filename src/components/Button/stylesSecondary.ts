import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const stylesSecondary = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(6),
    backgroundColor: Colors.white,
    padding: scale(12),
    minHeight: scale(45),
  },
  text: {
    flex: 1,
    marginHorizontal: scale(10),
    color: Colors.black,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { stylesSecondary };
