import React from 'react';
import { View } from 'react-native';
import { ChevronRightIcon, IconSizes } from 'src/assets/icons';
import { Line } from 'src/components/Line';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { formatCurrency } from 'src/util/currency';
import type { Service } from '../../types';
import { styles } from './styles';

interface ServicesListItemProps {
  item: Service;
  onPress: (item: Service) => void;
}

export const ServicesListItem: React.FC<ServicesListItemProps> = ({
  item,
  onPress,
}) => (
  <>
    <Line />
    <PressableOpacity
      style={styles.container}
      onPress={(): void => onPress(item)}>
      <View style={styles.containerTexts}>
        <Text size={TextSizes.small} weight={TextWeights.bold}>
          {item.name}
        </Text>
        <Text
          size={TextSizes.small}
          weight={TextWeights.bold}
          color={Colors.gray}
          style={styles.price}>
          {formatCurrency(item.price)}
        </Text>
      </View>
      <ChevronRightIcon size={IconSizes.xsmall} fill={Colors.black} />
    </PressableOpacity>
  </>
);
