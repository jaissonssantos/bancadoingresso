import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  backButton: {
    padding: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { styles };
