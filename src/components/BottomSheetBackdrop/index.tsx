import React, { useMemo } from 'react';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors } from 'src/styleguide/colors';

export const BottomSheetBackdrop: React.FC<BottomSheetBackdropProps> = ({
  style,
  animatedIndex,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [Colors.overlayDarkCart, Colors.overlayDark],
    ),
  }));

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};
