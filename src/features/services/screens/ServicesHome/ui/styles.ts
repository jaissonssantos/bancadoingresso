import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  flatlistContent: {
    flexGrow: 1,
  },
  safeArea: {
    paddingTop: verticalScale(20),
  },
  title: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(24),
  },
  line: {
    marginTop: verticalScale(18),
  },
  addServiceButton: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
  },
  noServicesMsg: {
    paddingHorizontal: scale(21),
  },
});

export { styles };
