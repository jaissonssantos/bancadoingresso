import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: verticalScale(20),
  },
  container: {
    flex: 1,
    marginTop: verticalScale(40),
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(24),
  },
  title: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    fontWeight: 'bold',
  },
  spacingBottom: {
    marginBottom: verticalScale(10),
  },
});

export { styles };
