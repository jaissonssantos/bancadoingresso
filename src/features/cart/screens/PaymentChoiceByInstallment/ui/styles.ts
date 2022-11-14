import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { verticalScale, scale } from 'src/styleguide/scaling';

export const PADDING_HORIZONTAL = scale(15);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  contentTitle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: verticalScale(12),
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  bold: {
    fontWeight: 'bold',
  },
  flex1: {
    flex: 1,
  },
  textBlue: {
    color: Colors.info,
  },
  textRed: {
    color: Colors.errorRed,
  },
  textGreen: {
    color: Colors.success,
  },
  spacingTop: {
    marginTop: verticalScale(10),
  },
  spacingLeft: {
    marginLeft: verticalScale(10),
  },
  spacingContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: verticalScale(4),
  },
  spacingBottom: {
    marginBottom: verticalScale(12),
  },
  containerButton: {
    padding: scale(10),
    backgroundColor: Colors.black,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.blackLight,
    padding: scale(14),
    paddingVertical: verticalScale(18),
    borderRadius: scale(6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: verticalScale(10),
  },
});

export { styles };
