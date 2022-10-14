import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  fade: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  content: {
    flex: 1,
    marginTop: verticalScale(40),
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(24),
  },
  image: {
    height: verticalScale(280),
  },
  alignSelf: {
    alignSelf: 'center',
  },
  title: {
    marginTop: verticalScale(60),
    marginBottom: verticalScale(20),
    fontWeight: 'bold',
  },
  description: {
    marginTop: verticalScale(16),
  },
  buttonTitle: {
    fontWeight: '400',
    textDecorationLine: 'underline',
    color: Colors.white,
  },
  flex1: {
    flex: 1,
  },
  button: {
    marginBottom: verticalScale(14),
  },
  eyePassword: {
    position: 'absolute',
    right: scale(14),
    top: verticalScale(12),
  },
});

export { styles };
