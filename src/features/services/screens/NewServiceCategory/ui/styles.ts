import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(18),
  },
  containerInputs: {
    flex: 1,
    marginBottom: verticalScale(30),
  },
});

export { styles };
