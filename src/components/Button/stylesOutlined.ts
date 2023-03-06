import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const stylesOutlined = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(6),
    borderColor: Colors.primary,
    borderWidth: scale(1),
    padding: scale(8),
    minHeight: scale(45),
  },
  text: {
    flex: 1,
    marginHorizontal: scale(10),
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { stylesOutlined };
