import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SlideInDown,
  SlideInUp,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { View, ViewStyle } from 'react-native';
import { ArrowDownIcon, IconSizes } from 'src/assets/icons';
import { Text, TextSizes } from 'src/components/Text';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { styles } from './styles';

interface AccordionProps {
  title: string;
  image: FastImageProps['source'];
  children: React.ReactNode;
  colorIcon?: string;
  isContentNoPadding?: boolean;
  style?: ViewStyle | ViewStyle[] | undefined;
  onPress?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  image,
  children,
  colorIcon,
  isContentNoPadding,
  style,
}) => {
  const [show, setShow] = useState(false);
  const animation = useSharedValue(0);
  const border = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: animation.value + 'deg',
        },
      ],
      borderBottomEndRadius: border.value,
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderBottomEndRadius: border.value,
      borderBottomStartRadius: border.value,
      borderTopStartRadius: 6,
      borderTopEndRadius: 6,
    };
  });

  useEffect(() => {
    animation.value = withTiming(show ? -180 : 0, {
      duration: 200,
      easing: Easing.linear,
    });
    border.value = withTiming(show ? 0 : 6, {
      duration: 100,
    });
  }, [show]);

  const finalContentStyle = [
    styles.content,
    isContentNoPadding ? styles.contentNoPadding : null,
  ];

  return (
    <View style={style}>
      <PressableOpacity onPress={(): void => setShow(!show)}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <FastImage source={image} resizeMode="cover" style={styles.image} />
          <View style={styles.description}>
            <Text size={TextSizes.small}>{title}</Text>
            <Animated.View style={animatedStyle}>
              <ArrowDownIcon size={IconSizes.xsmall} fill={colorIcon} />
            </Animated.View>
          </View>
        </Animated.View>
      </PressableOpacity>
      <Animated.View
        entering={SlideInDown.duration(300).easing(withTiming)}
        exiting={SlideInUp.duration(300)}>
        {show && <View style={finalContentStyle}>{children}</View>}
      </Animated.View>
    </View>
  );
};
