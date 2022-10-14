import { StyleSheet } from 'react-native';
import { verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: verticalScale(5),
  },
});

export { styles };
