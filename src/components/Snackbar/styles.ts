import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';
import { isAndroid } from 'src/util/platform';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 42,
    padding: 12,
    shadowColor: '#00000060',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 4,
  },
  containerDefault: {
    backgroundColor: Colors.black,
  },
  containerDanger: {
    backgroundColor: Colors.errorRed,
  },
  containerInfo: {
    backgroundColor: Colors.info,
  },
  containerSuccess: {
    backgroundColor: Colors.success,
  },
  snackbar: {
    position: 'absolute',
    bottom: isAndroid ? 0 : 50,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  icon: {
    marginRight: scale(10),
  },
  text: {
    flex: 1,
    color: Colors.white,
  },
});

export default styles;
