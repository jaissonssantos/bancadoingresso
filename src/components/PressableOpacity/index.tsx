import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface PressableOpacityProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export const PressableOpacity: React.FC<PressableOpacityProps> = ({
  disabled,
  style,
  ...rest
}) => {
  const finalStyle = { opacity: disabled ? 0.5 : 1 };
  return (
    <Pressable
      {...rest}
      style={({ pressed }): StyleProp<ViewStyle> => [
        { opacity: pressed ? 0.5 : 1 },
        finalStyle,
        style,
      ]}
    />
  );
};
