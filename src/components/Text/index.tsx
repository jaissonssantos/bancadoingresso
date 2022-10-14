import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { Fonts } from 'src/styleguide/fonts';
import { scale } from 'src/styleguide/scaling';

export enum TextSizes {
  xxsmall = 'xxsmall',
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  xmedium = 'xmedium',
  large = 'large',
  xlarge = 'xlarge',
  xxlarge = 'xxlarge',
  xxxlarge = 'xxxlarge',
  xxxxlarge = 'xxxxlarge',
  extra = 'extra',
}

export enum TextWeights {
  light = 'light',
  regular = 'regular',
  medium = 'medium',
  bold = 'bold',
}

export enum TextAligns {
  left = 'left',
  right = 'right',
  center = 'center',
}

export interface TextProps extends RNTextProps {
  color?: Colors;
  size?: TextSizes;
  weight?: TextWeights;
  align?: TextAligns;
  lineHeightFactor?: number;
}

const textSizes: { [key in TextSizes]: number } = {
  xxsmall: scale(8),
  xsmall: scale(10),
  small: scale(12),
  medium: scale(14),
  xmedium: scale(16),
  large: scale(18),
  xlarge: scale(20),
  xxlarge: scale(22),
  xxxlarge: scale(24),
  xxxxlarge: scale(30),
  extra: scale(50),
};

const textWeights: { [key in TextWeights]: Fonts } = {
  light: Fonts.PoppinsLight,
  regular: Fonts.PoppinsRegular,
  medium: Fonts.PoppinsMedium,
  bold: Fonts.PoppinsBold,
};

export const Text: React.FC<TextProps> = ({
  style,
  color = Colors.text,
  size = TextSizes.medium,
  weight = TextWeights.regular,
  align = TextAligns.left,
  lineHeightFactor = 1.3,
  ...rest
}) => (
  <RNText
    allowFontScaling={false}
    style={[
      {
        color,
        fontSize: textSizes[size],
        lineHeight: textSizes[size] * lineHeightFactor,
        fontFamily: textWeights[weight],
        textAlign: align,
      },
      style,
    ]}
    {...rest}
  />
);
