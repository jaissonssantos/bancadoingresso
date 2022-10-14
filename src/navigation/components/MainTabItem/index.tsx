import React from 'react';
import { Pressable } from 'react-native';
import { IconSizes } from 'src/assets/icons';
import type { SvgIconComponent } from 'src/assets/icons/svgs/svgIconSizeHoc';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface MainTabItemProps {
  label: string;
  Icon: SvgIconComponent;
  active: boolean;
  onPress: () => void;
}

export const MainTabItem: React.FC<MainTabItemProps> = ({
  label,
  Icon,
  active,
  onPress,
}) => {
  const color = active ? Colors.white : Colors.whiteDarkMedium;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon fill={color} size={IconSizes.small} />
      <Text
        size={TextSizes.xsmall}
        align={TextAligns.center}
        weight={TextWeights.medium}
        color={color}
        style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};
