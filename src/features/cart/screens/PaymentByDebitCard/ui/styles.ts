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
    flexGrow: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  bold: {
    fontWeight: 'bold',
  },
  flex1: {
    flex: 1,
  },
  spacingTop: {
    marginTop: verticalScale(10),
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
  dialog: {
    borderRadius: scale(6),
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
});

export { styles };
