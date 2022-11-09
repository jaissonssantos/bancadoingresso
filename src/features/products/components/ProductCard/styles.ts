import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    maxWidth: scale(98),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: verticalScale(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    padding: 0,
  },
  item: {
    position: 'relative',
    width: scale(98),
    height: scale(74),
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.blackMedium,
    borderRadius: scale(6),
    marginBottom: verticalScale(4),
  },
  flex1: {
    flex: 1,
  },
  spacingTop: {
    marginTop: scale(6),
  },
  spacingBottom: {
    marginBottom: scale(6),
  },
  actions: {
    marginBottom: scale(6),
  },
  textQuantity: {
    marginHorizontal: scale(14),
  },
  fade: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export { styles };
