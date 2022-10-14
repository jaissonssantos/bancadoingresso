import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'src/styleguide/scaling';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(20),
    paddingRight: scale(25),
    paddingVertical: verticalScale(12),
  },
  containerTexts: {
    flex: 1,
  },
  price: {
    marginTop: verticalScale(2),
  },
});

export { styles };
