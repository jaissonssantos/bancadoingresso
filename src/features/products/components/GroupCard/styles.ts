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
    marginBottom: scale(10),
    textTransform: 'capitalize',
  },
  fade: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  item: {
    position: 'relative',
    width: scale(98),
    height: scale(125),
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.blackMedium,
    borderRadius: scale(6),
    margin: verticalScale(4),
  },
});

export { styles };
