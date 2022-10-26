import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { verticalScale, scale } from 'src/styleguide/scaling';

export const PADDING_HORIZONTAL = scale(15);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  safeArea: {
    flex: 1,
    paddingTop: verticalScale(12),
  },
  container: {
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
    marginTop: verticalScale(14),
    marginBottom: verticalScale(6),
  },
  containerCarousel: {
    paddingBottom: verticalScale(8),
  },
});

export { styles };
