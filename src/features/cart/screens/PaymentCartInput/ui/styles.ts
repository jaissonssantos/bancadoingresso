import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { verticalScale, scale } from 'src/styleguide/scaling';

export const PADDING_HORIZONTAL = scale(15);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: verticalScale(12),
  },
  title: {
    fontWeight: 'bold',
  },
  spacingTop: {
    marginTop: verticalScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacingContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: verticalScale(4),
  },
  spacingBottom: {
    marginBottom: verticalScale(12),
  },
  containerButton: {
    padding: scale(10),
    backgroundColor: Colors.black,
  },
});

export { styles };
