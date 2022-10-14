import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.border,
    height: verticalScale(8),
    borderRadius: scale(10),
    overflow: 'hidden',
  },
  activeBar: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export { styles };
