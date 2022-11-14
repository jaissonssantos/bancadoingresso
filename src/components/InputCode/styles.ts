import { StyleSheet, Platform } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { Fonts } from 'src/styleguide/fonts';
import { scale, moderateScale, verticalScale } from 'src/styleguide/scaling';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  codeSymbol: {
    borderRadius: scale(6),
    borderWidth: scale(1),
    borderColor: Colors.blackLight,
    color: Colors.white,
    fontFamily: Fonts.PoppinsBold,
    fontSize: moderateScale(20),
    backgroundColor: Colors.blackLight,
    overflow: 'hidden',
    margin: scale(4),
    padding: scale(4),
    paddingTop: isAndroid ? 12 : 6,
    textAlign: 'center',
    fontWeight: 'bold',
    width: scale(42),
    height: scale(48),
  },
  codeSymbolConfirmationCode: {
    borderRadius: scale(6),
    borderWidth: scale(1),
    borderColor: Colors.blackLight,
    color: Colors.white,
    fontFamily: Fonts.PoppinsBold,
    fontSize: moderateScale(20),
    backgroundColor: Colors.blackLight,
    overflow: 'hidden',
    margin: scale(4),
    padding: scale(4),
    paddingTop: isAndroid ? 12 : 6,
    textAlign: 'center',
    fontWeight: 'bold',
    width: scale(42),
    height: scale(48),
  },
  codeSymbolActive: {
    borderColor: Colors.whiteDarkMedium,
    borderWidth: scale(1),
  },
  codeSymbolEditable: {
    backgroundColor: Colors.white,
    borderColor: Colors.errorRed,
    borderWidth: scale(2),
    color: Colors.primaryDark,
  },
  codeSymbolError: {
    borderColor: Colors.errorRed,
    borderWidth: scale(1),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorMessage: {
    color: Colors.errorRed,
    fontFamily: Fonts.PoppinsRegular,
    fontSize: moderateScale(10),
    margin: scale(5),
    marginLeft: scale(10),
    marginBottom: scale(10),
  },
  input: {
    height: 0,
    width: 0,
    position: 'absolute',
  },
});

export default styles;
