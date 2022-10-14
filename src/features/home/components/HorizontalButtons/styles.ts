import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'src/styleguide/scaling';
import { PADDING_HORIZONTAL } from '../../screens/Home/ui/styles';

export const ITEM_SEPARATOR_WIDTH = scale(5);

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(25),
    paddingLeft: PADDING_HORIZONTAL,
  },
  flatListContent: {
    paddingRight: PADDING_HORIZONTAL,
  },
  separator: {
    width: ITEM_SEPARATOR_WIDTH,
  },
});

export { styles };
