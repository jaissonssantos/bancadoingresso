import { StyleSheet } from 'react-native';
import { scale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  dot: {
    width: scale(12),
    height: scale(2),
    marginHorizontal: scale(1),
  },
});

export { styles };
