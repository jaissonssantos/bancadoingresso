import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { Fonts } from 'src/styleguide/fonts';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
  },
  label: {
    marginBottom: verticalScale(6),
  },
  containerInput: {
    position: 'relative',
  },
  search: {
    position: 'absolute',
    top: verticalScale(16),
    left: scale(16),
  },
  input: {
    height: verticalScale(45),
    borderRadius: scale(50),
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.text,
    fontSize: scale(12),
    paddingHorizontal: scale(40),
    borderWidth: 1,
    borderColor: Colors.whiteDarkLight,
  },
  inputError: {
    borderColor: Colors.errorRed,
  },
  textarea: {
    height: verticalScale(80),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    textAlignVertical: 'top',
  },
  rowBelowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: scale(2),
    paddingRight: scale(5),
    paddingTop: verticalScale(5),
  },
  errorText: {
    flex: 1,
    paddingRight: scale(20),
  },
});

export { styles };
