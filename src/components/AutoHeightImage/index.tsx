import React, { useState } from 'react';
import { LayoutChangeEvent, View, ViewProps } from 'react-native';
import type { FastImageProps, OnLoadEvent } from 'react-native-fast-image';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';

interface AutoHeightImageProps extends Omit<FastImageProps, 'style'> {
  containerStyle?: ViewProps['style'];
  imageStyle?: FastImageProps['style'];
}

export const AuthHeightImage: React.FC<AutoHeightImageProps> = ({
  containerStyle,
  imageStyle,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState<number>(300);

  const onLoad = (e: OnLoadEvent): void =>
    setHeight(width * (e.nativeEvent.height / e.nativeEvent.width));

  const onLayout = (e: LayoutChangeEvent): void =>
    setWidth(e.nativeEvent.layout.width);

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      {!!width && (
        <FastImage
          onLoad={onLoad}
          style={[imageStyle, { width, height }]}
          resizeMode="contain"
          {...props}
        />
      )}
    </View>
  );
};
