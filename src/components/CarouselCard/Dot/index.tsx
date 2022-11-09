import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}

export const Dot: React.FC<DotProps> = ({ index, activeDotIndex }) => {
  const dotAnimatedStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;

    return {
      backgroundColor: isActive ? Colors.white : Colors.blackMedium,
    };
  });

  return <Animated.View style={[styles.dot, dotAnimatedStyle]} />;
};
