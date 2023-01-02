import { StyleSheet } from 'react-native';
import { verticalScale } from 'src/styleguide/scaling';
import { Colors } from 'src/styleguide/colors';

export const styles = StyleSheet.create({
  title: {
    marginTop: verticalScale(12),
    color: Colors.black,
  },
  message: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(25),
    color: Colors.black,
  },
});
