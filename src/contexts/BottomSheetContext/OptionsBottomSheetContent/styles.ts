import { StyleSheet } from 'react-native';
import { verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  title: {
    marginBottom: verticalScale(16),
  },
  button: {
    marginVertical: verticalScale(4),
  },
});

export { styles };
