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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: verticalScale(12),
  },
  container: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: scale(-8),
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  paymentMethod: {
    width: scale(154),
    height: scale(98),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackMedium,
    borderRadius: scale(6),
    margin: verticalScale(6),
  },
  title: {
    fontWeight: 'bold',
  },
  flex1: {
    flex: 1,
  },
  spacingTop: {
    marginTop: verticalScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacingContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: verticalScale(4),
  },
  spacingBottom: {
    marginBottom: verticalScale(12),
  },
});

export { styles };
