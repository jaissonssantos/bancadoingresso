import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const stylesOutlined = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(6),
    borderColor: Colors.primary,
    borderWidth: scale(1),
    padding: scale(8),
  },
  text: {
    marginHorizontal: scale(10),
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    margin: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    paddingTop: verticalScale(1),
  },
});

export { stylesOutlined };
