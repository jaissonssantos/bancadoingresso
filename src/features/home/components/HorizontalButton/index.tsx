import React from 'react';
import { IconSizes } from 'src/assets/icons';
import type { SvgIconComponent } from 'src/assets/icons/svgs/svgIconSizeHoc';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextSizes } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export interface HorizontalButtonProps {
  Icon: SvgIconComponent;
  label: string;
  onPress: () => void;
}

export const HorizontalButton: React.FC<HorizontalButtonProps> = ({
  Icon,
  onPress,
  label,
}) => (
  <PressableOpacity style={styles.container} onPress={onPress}>
    <Icon fill={Colors.primary} size={IconSizes.xxxxmedium} />
    <Text size={TextSizes.small} style={styles.label} lineHeightFactor={1.1}>
      {label}
    </Text>
  </PressableOpacity>
);
