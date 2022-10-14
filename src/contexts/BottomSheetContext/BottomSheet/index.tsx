import React, { forwardRef, useImperativeHandle } from 'react';
import { LayoutChangeEvent, Pressable } from 'react-native';
import Reanimated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomSheetShowOptions } from '..';
import { styles } from './styles';

const ReanimatedSafeAreaView = Reanimated.createAnimatedComponent(SafeAreaView);
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

interface BottomSheetProps extends BottomSheetShowOptions {
  onFinishedHiding: () => void;
}

export interface BottomSheetRef {
  hide: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ content, onFinishedHiding }, ref) => {
    const bottomSheetHeight = useSharedValue(0);
    const transition = useSharedValue(0);

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
      opacity: transition.value,
    }));

    const bottomSheetAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            transition.value,
            [0, 1],
            [0, -bottomSheetHeight.value],
          ),
        },
      ],
    }));

    const onLayout = (e: LayoutChangeEvent): void => {
      bottomSheetHeight.value = e.nativeEvent.layout.height;
      transition.value = withTiming(1);
    };

    const hide = (): void => {
      transition.value = withTiming(0, {}, finished => {
        if (finished) {
          runOnJS(onFinishedHiding)();
        }
      });
    };

    useImperativeHandle(ref, () => ({ hide }));

    return (
      <>
        <ReanimatedPressable
          onPress={hide}
          style={[styles.overlay, overlayAnimatedStyle]}
        />
        <ReanimatedSafeAreaView
          edges={['bottom']}
          onLayout={onLayout}
          style={[styles.bottomSheet, bottomSheetAnimatedStyle]}>
          {content}
        </ReanimatedSafeAreaView>
      </>
    );
  },
);
