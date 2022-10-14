import { screenHeight, screenWidth } from 'src/util/dimensions';

/* Guideline sizes are based on standard ~5" screen mobile device */
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number): number =>
  (screenWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (screenHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
