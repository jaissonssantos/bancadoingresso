import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';

const ITEM_SIZE = scale(80);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    backgroundColor: Colors.lightGray,
    marginBottom: verticalScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10),
  },
});

export { styles };
