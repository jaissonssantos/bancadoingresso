import React, { useEffect } from 'react';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { convertToClassComponent } from 'src/hoc/convertToClassComponent';
import { Text, TextProps } from '../../../Text';

const ReanimatedText = Reanimated.createAnimatedComponent<TextProps>(
  convertToClassComponent(Text),
);

export interface TextAnimatedProps extends TextProps {
  delay?: number;
  duration: number;
}

export const TextAnimated: React.FC<TextAnimatedProps> = ({
  duration,
  delay = 0,
  style,
  ...rest
}) => {
  const animatedValue = useSharedValue(0);

  const textAnimatedValue = useAnimatedStyle(() => ({
    opacity: animatedValue.value,
  }));

  useEffect(() => {
    animatedValue.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration }), -1, false),
    );
  }, [animatedValue, delay, duration]);

  return <ReanimatedText style={[textAnimatedValue, style]} {...rest} />;
};
