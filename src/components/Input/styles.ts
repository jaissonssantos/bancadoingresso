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
  input: {
    height: verticalScale(45),
    borderRadius: scale(6),
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.text,
    fontSize: scale(14),
    paddingHorizontal: scale(15),
    backgroundColor: Colors.blackLight,
  },
  inputError: {
    borderWidth: scale(1),
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
