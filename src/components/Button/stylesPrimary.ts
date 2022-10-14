import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const stylesPrimary = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(6),
    backgroundColor: Colors.primary,
    padding: scale(12),
  },
  text: {
    marginHorizontal: scale(10),
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    backgroundColor: Colors.primary,
    paddingTop: verticalScale(1),
  },
});

export { stylesPrimary };
