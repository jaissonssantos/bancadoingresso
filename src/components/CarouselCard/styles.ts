import { StyleSheet } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { scale } from 'src/styleguide/scaling';

export const cardWidth = scale(84);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: scale(12),
    textTransform: 'capitalize',
  },
  carouselCard: {
    paddingLeft: scale(6),
  },
  item: {
    width: cardWidth,
    height: scale(105),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackMedium,
    borderRadius: scale(6),
    padding: scale(6),
    margin: scale(5),
  },
  footer: {
    width: scale(40),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
});

export { styles };
