import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { verticalScale, scale } from 'src/styleguide/scaling';

export const PADDING_HORIZONTAL = scale(15);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  title: {
    marginTop: verticalScale(6),
    fontWeight: 'bold',
  },
  spacingBottom: {
    marginBottom: verticalScale(6),
  },
  spacingBottomLarge: {
    marginBottom: verticalScale(12),
  },
  spacingBottomXLarge: {
    marginBottom: verticalScale(16),
  },
  spacingBottomXXLarge: {
    marginBottom: verticalScale(24),
  },
  spacingCarouselTitle: {
    marginLeft: scale(14),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
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
  productList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: scale(-6),
  },
});

export { styles };
