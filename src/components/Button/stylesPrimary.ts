import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const stylesPrimary = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(6),
    backgroundColor: Colors.primary,
    padding: scale(12),
    minHeight: scale(45),
  },
  text: {
    marginHorizontal: scale(10),
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { stylesPrimary };
