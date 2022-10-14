import { StyleSheet } from 'react-native';
import { scale } from 'src/styleguide/scaling';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: scale(10),
  },
});
