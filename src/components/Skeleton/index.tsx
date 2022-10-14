import React, { useEffect } from 'react';
import type { ViewProps } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';

export const Skeleton: React.FC<ViewProps> = ({ style, ...props }) => {
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedValue.value,
  }));

  useEffect(() => {
    animatedValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.3, { duration: 500 }),
      ),
      -1,
    );
  }, [animatedValue]);

  return (
    <Reanimated.View
      style={[styles.container, animatedStyle, style]}
      {...props}
    />
  );
};
