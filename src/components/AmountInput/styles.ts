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
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.text,
    fontSize: scale(18),
    fontWeight: 'bold',
    paddingRight: scale(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.white,
  },
  inputError: {
    borderBottomColor: Colors.errorRed,
  },
  inputIconEdit: {
    position: 'absolute',
    right: scale(15),
    top: verticalScale(15),
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
