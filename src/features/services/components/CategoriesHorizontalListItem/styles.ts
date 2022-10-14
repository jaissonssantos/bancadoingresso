import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const IMAGE_SIZE = scale(65);
const ITEM_SIZE = IMAGE_SIZE + scale(10);

const styles = StyleSheet.create({
  container: {
    width: ITEM_SIZE,
    alignItems: 'center',
  },
  square: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
  },
  squareSelected: {
    backgroundColor: Colors.primary,
  },
  squareUnselected: {
    backgroundColor: Colors.border,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: scale(1.5),
    borderColor: Colors.primary,
    borderRadius: scale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10),
  },
  label: {
    marginTop: verticalScale(5),
    letterSpacing: scale(-0.1),
  },
});

export { styles, ITEM_SIZE };
