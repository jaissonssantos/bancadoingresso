import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const BLOCK_WIDTH = scale(16);
const BLOCK_HORIZONTAL_SPACE = scale(2);
const TOTAL_BLOCK_WIDTH = BLOCK_WIDTH + BLOCK_HORIZONTAL_SPACE * 2;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBlocks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
  },
  block: {
    width: BLOCK_WIDTH,
    height: scale(8),
    borderRadius: scale(10),
    marginHorizontal: BLOCK_HORIZONTAL_SPACE,
  },
  blockInactive: {
    backgroundColor: Colors.border,
  },
  blockActive: {
    backgroundColor: Colors.primary,
  },
  minusPressable: {
    paddingHorizontal: scale(14),
  },
  plusPressable: {
    paddingHorizontal: scale(10),
  },
});

export { styles, TOTAL_BLOCK_WIDTH };
