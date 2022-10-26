import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import FadeBackground from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes } from 'src/components/Text';
import type { IGroup } from 'src/features/products/model/groupDTO';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface GroupCardProps {
  data?: IGroup[];
  style?: ViewStyle | ViewStyle[] | undefined;
  containerStyle?: ViewStyle | ViewStyle[] | undefined;
  onPress: (group: IGroup) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
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
          <FastImage
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFill}
          />
          <FadeBackground
            colors={[
              Colors.overlay,
              Colors.overlay,
              Colors.overlay,
              Colors.overlayMedium,
            ]}
            style={styles.fade}>
            <Text
              size={TextSizes.xsmall}
              align={TextAligns.center}
              style={styles.title}>
              {item.name}
            </Text>
          </FadeBackground>
        </PressableOpacity>
      ))}
    </View>
  );
};
