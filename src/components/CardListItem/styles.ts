import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.blackLight,
    padding: scale(10),
    overflow: 'hidden',
    borderRadius: scale(6),
  },
  border: {
    borderBottomColor: Colors.whiteDark,
    borderBottomWidth: 1,
  },
  flex1: {
    flex: 1,
  },
  spacingBottom: {
    marginBottom: scale(6),
  },
});

export { styles };
