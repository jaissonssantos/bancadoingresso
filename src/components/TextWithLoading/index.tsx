import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text, TextProps } from '../Text';
import { TextAnimated } from './components/TextAnimated';
import { styles } from './styles';

const TEXT_LOADER_LENGTH = 3;
const ANIMATION_DURATION = 900;

interface TextWithLoadingProps extends TextProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextWithLoading: React.FC<TextWithLoadingProps> = ({
  children,
  containerStyle,
  ...rest
}) => (
  <View style={[styles.container, containerStyle]}>
    <Text {...rest}>{children}</Text>
    {Array.from({ length: TEXT_LOADER_LENGTH }).map((_, index) => (
      <TextAnimated
        {...rest}
        key={index}
        duration={ANIMATION_DURATION}
        delay={index * (ANIMATION_DURATION / TEXT_LOADER_LENGTH)}>
        .
      </TextAnimated>
    ))}
  </View>
);
