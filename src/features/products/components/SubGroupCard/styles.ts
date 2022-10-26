import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: scale(-4),
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    textTransform: 'capitalize',
  },
  item: {
    position: 'relative',
    width: scale(98),
    height: scale(125),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackMedium,
    borderRadius: scale(6),
    padding: scale(4),
    margin: verticalScale(4),
  },
});

export { styles };
