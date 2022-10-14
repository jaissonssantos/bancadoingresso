import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(14),
    backgroundColor: Colors.blackLight,
    borderRadius: scale(6),
  },
  title: {
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
});

export { styles };
