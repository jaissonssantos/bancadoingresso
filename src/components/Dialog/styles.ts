import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

const PADDING = scale(16);

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.blackMedium,
    borderRadius: 6,
  },
  header: {
    justifyContent: 'center',
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: scale(12),
    paddingHorizontal: scale(PADDING),
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.overlayDark,
    justifyContent: 'center',
    padding: scale(36),
  },
  modalContent: {
    marginVertical: scale(PADDING / 2),
  },
  modalFooterButton: {
    paddingHorizontal: scale(PADDING),
    paddingBottom: scale(PADDING),
  },
  spacingBottom: {
    marginTop: scale(10),
  },
});

export default styles;
