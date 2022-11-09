import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { verticalScale, scale } from 'src/styleguide/scaling';

export const PADDING_HORIZONTAL = scale(15);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    fontWeight: 'bold',
  },
  flex1: {
    flex: 1,
  },
  containerButton: {
    padding: scale(10),
    backgroundColor: Colors.overlayDarkCart,
  },
  iconRight: {
    position: 'absolute',
    right: scale(16),
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
