import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.blackLight,
    borderRadius: scale(6),
    overflow: 'hidden',
  },
  description: {
    flex: 1,
    paddingHorizontal: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: scale(14),
    backgroundColor: Colors.blackLight,
    borderBottomEndRadius: scale(6),
    borderBottomStartRadius: scale(6),
    borderTopWidth: 1,
    borderTopColor: Colors.whiteDark,
  },
  contentNoPadding: {
    padding: 0,
  },
  flex1: {
    flex: 1,
  },
  image: {
    width: scale(46),
    height: scale(34),
  },
});

export { styles };
