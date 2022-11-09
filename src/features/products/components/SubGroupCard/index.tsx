import React from 'react';
import { View, ViewStyle } from 'react-native';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes } from 'src/components/Text';
import type { ISubGroup } from 'src/features/products/model/subgroupDTO';
import { styles } from './styles';

interface SubGroupCardProps {
  data?: ISubGroup[];
  style?: ViewStyle | ViewStyle[] | undefined;
  containerStyle?: ViewStyle | ViewStyle[] | undefined;
  onPress: (subgroup: ISubGroup) => void;
}

export const SubGroupCard: React.FC<SubGroupCardProps> = ({
  data = [],
  style,
  containerStyle,
  onPress,
}) => {
  const finalStyle = [
    styles.root,
    data.length > 2 ? styles.spaceBetween : null,
  ];

  return (
    <View style={[styles.root, finalStyle, containerStyle]}>
      {data.map(item => (
        <PressableOpacity
          onPress={(): void => onPress(item)}
          key={item.id}
          style={[styles.item, style]}>
          <Text
            size={TextSizes.xsmall}
            align={TextAligns.center}
            style={styles.title}>
            {item.name}
          </Text>
        </PressableOpacity>
      ))}
    </View>
  );
};
