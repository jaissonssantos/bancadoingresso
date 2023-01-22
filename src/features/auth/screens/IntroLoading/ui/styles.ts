import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginVertical: verticalScale(20),
  },
  message: {
    color: Colors.white,
  },
});

export { styles };
