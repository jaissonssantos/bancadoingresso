import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.blackLight,
    borderRadius: scale(6),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    overflow: 'hidden',
    marginBottom: scale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    padding: 0,
  },
  flex1: {
    flex: 1,
  },
  spacingBottom: {
    marginBottom: scale(6),
  },
  actions: {
    marginLeft: scale(4),
  },
  textQuantity: {
    marginHorizontal: scale(14),
  },
});

export { styles };
