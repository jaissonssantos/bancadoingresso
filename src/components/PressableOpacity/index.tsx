import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface PressableOpacityProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export const PressableOpacity: React.FC<PressableOpacityProps> = ({
  style,
  ...rest
}) => (
  <Pressable
    {...rest}
    style={({ pressed }): StyleProp<ViewStyle> => [
      style,
      { opacity: pressed ? 0.5 : 1 },
    ]}
  />
);
