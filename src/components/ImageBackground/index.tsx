import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { ColorsRGBA } from 'src/styleguide/colors';
import { styles } from './styles';

interface ImageBackgroundProps extends FastImageProps {
  overlayOpacity?: number;
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  style,
  children,
  overlayOpacity = 0,
  ...imageProps
}) => (
  <View style={[styles.container, style]}>
    <FastImage {...imageProps} style={StyleSheet.absoluteFill} />
    {overlayOpacity > 0 && (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: ColorsRGBA.black(overlayOpacity) },
        ]}
      />
    )}
    {children}
  </View>
);
