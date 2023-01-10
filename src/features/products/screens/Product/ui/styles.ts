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
  skeletonSearch: {
    height: verticalScale(40),
    width: '100%',
    backgroundColor: Colors.blackLight,
    borderRadius: scale(46),
  },
  skeletonTitle: {
    height: verticalScale(20),
    width: scale(240),
    backgroundColor: Colors.blackLight,
    marginVertical: verticalScale(30),
    borderRadius: scale(6),
  },
  skeletonProduct: {
    justifyContent: 'flex-end',
    marginBottom: verticalScale(10),
    marginHorizontal: scale(6),
  },
  skeletonProductImage: {
    width: scale(98),
    height: scale(74),
    backgroundColor: Colors.blackLight,
    borderRadius: scale(6),
    marginBottom: verticalScale(4),
  },
  skeletonProductTitle: {
    height: verticalScale(10),
    width: scale(72),
    backgroundColor: Colors.blackLight,
    borderRadius: scale(8),
    marginBottom: verticalScale(4),
  },
  skeletonProductPrice: {
    height: verticalScale(10),
    width: scale(42),
    backgroundColor: Colors.blackLight,
    borderRadius: scale(6),
  },
});

export { styles };
