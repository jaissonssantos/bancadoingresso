import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { Fonts } from 'src/styleguide/fonts';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginBottom: verticalScale(6),
  },
  containerInput: {
    position: 'relative',
    borderRadius: scale(50),
    borderWidth: 1,
    borderColor: Colors.whiteDarkLight,
  },
  search: {
    position: 'absolute',
    top: verticalScale(16),
    left: scale(16),
  },
  input: {
    height: verticalScale(45),
    fontFamily: Fonts.PoppinsMedium,
    color: Colors.text,
    fontSize: scale(12),
    paddingHorizontal: scale(40),
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
  searchClean: {
    position: 'absolute',
    top: verticalScale(18),
    right: scale(16),
  },
  errorText: {
    flex: 1,
    paddingRight: scale(20),
  },
  cancelText: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: scale(12),
    color: Colors.whiteDarkLight,
    marginLeft: scale(10),
  },
});

export { styles };
