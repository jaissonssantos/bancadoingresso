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
  input: {
    height: verticalScale(45),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: Colors.border,
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.text,
    fontSize: scale(14),
    paddingHorizontal: scale(15),
  },
  inputError: {
    borderColor: Colors.errorRed,
  },
  errorText: {
    flex: 1,
    paddingLeft: scale(2),
    paddingRight: scale(5),
    paddingTop: verticalScale(5),
  },
});

export { styles };
