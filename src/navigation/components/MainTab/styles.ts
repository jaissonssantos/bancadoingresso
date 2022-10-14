import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';
import { shadowStyle } from 'src/styleguide/styles';

export const PADDING_VERTICAL = verticalScale(10);

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    flexDirection: 'row',
    paddingHorizontal: scale(4),
    backgroundColor: Colors.blackLight,
    paddingTop: PADDING_VERTICAL,
  },
});

export { styles };
