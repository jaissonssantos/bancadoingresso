import React from 'react';
import type { ViewStyle } from 'react-native';
import { ChevronRightIcon, IconSizes } from 'src/assets/icons';
import { Text, TextSizes } from 'src/components/Text';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Colors } from 'src/styleguide/colors';

import { styles } from './styles';

interface CardListItemProps {
  title: string;
  hasBorder?: boolean;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export const CardListItem: React.FC<CardListItemProps> = ({
  title,
  hasBorder = false,
  onPress = (): void => {},
  style,
}) => (
  <PressableOpacity
    onPress={onPress}
    style={[styles.container, style, hasBorder ? styles.border : {}]}>
    <Text size={TextSizes.small} style={styles.flex1}>
      {title}
    </Text>

    <ChevronRightIcon size={IconSizes.small} color={Colors.white} />
  </PressableOpacity>
);
