import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale, verticalScale } from 'src/styleguide/scaling';
import { shadowStyle } from 'src/styleguide/styles';
import { PADDING_HORIZONTAL } from '../../screens/Home/ui/styles';

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    marginTop: verticalScale(26),
    marginHorizontal: PADDING_HORIZONTAL,
    padding: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
  },
  rowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
  },
  titleEmpty: {
    marginTop: verticalScale(6),
  },
  descriptionEmpty: {
    marginTop: verticalScale(2),
  },
  titleServices: {
    marginTop: verticalScale(8),
  },
  progressBar: {
    marginTop: verticalScale(10),
  },
  skeleton: {
    height: verticalScale(8),
    borderRadius: scale(12),
  },
  skeletonRight: {
    width: scale(30),
  },
  skeletonSmall: {
    width: '40%',
    marginTop: verticalScale(20),
  },
  skeletonMedium: {
    width: '70%',
    marginBottom: verticalScale(12),
  },
  skeletonLarge: {
    width: '100%',
    marginVertical: verticalScale(12),
  },
});

export { styles };
