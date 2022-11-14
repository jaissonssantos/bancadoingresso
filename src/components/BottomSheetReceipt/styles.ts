import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const PADDING = scale(16);

const styles = StyleSheet.create({
  container: {
    padding: scale(PADDING),
  },
  bottomSheet: {
    backgroundColor: Colors.black,
  },
  bold: {
    fontWeight: 'bold',
  },
  flex1: {
    flex: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacingTop: {
    marginTop: scale(16),
  },
  spacingBottom: {
    marginBottom: scale(16),
  },
  spacingBottomLarge: {
    marginBottom: scale(34),
  },
  handleIndicatorStyle: {
    backgroundColor: Colors.white,
    width: scale(82),
  },
  backdrop: {
    backgroundColor: Colors.primary,
  },
  buttonStyle: {
    paddingVertical: scale(4),
    minHeight: scale(36),
  },
  buttonOutlinedStyle: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
  },
  buttonTitleStyle: {
    fontSize: scale(10),
    fontWeight: 'bold',
    color: Colors.white,
  },
  buttonTitleSecondaryStyle: {
    color: Colors.black,
  },
  dialog: {
    borderRadius: scale(6),
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
