import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const HORIZONTAL_BUTTON_WIDTH = scale(74);

const styles = StyleSheet.create({
  container: {
    width: HORIZONTAL_BUTTON_WIDTH,
    backgroundColor: Colors.border,
    borderRadius: HORIZONTAL_BUTTON_WIDTH * 0.15,
    padding: scale(9),
    paddingRight: scale(1),
  },
  label: {
    marginTop: verticalScale(7),
    letterSpacing: scale(-0.1),
  },
});

export { styles, HORIZONTAL_BUTTON_WIDTH };
