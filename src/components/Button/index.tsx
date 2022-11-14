import React, { ReactElement } from 'react';
import { ActivityIndicator, StyleProp, TextStyle, View } from 'react-native';
import { Colors } from 'src/styleguide/colors';
import { PressableOpacity, PressableOpacityProps } from '../PressableOpacity';
import { Text, TextAligns, TextSizes, TextWeights } from '../Text';
import { stylesOutlined } from './stylesOutlined';
import { stylesPrimary } from './stylesPrimary';
import { stylesSecondary } from './stylesSecondary';
import { stylesText } from './stylesText';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  outlined = 'outlined',
  text = 'text',
}

export enum ButtonIconPosition {
  right = 'right',
  left = 'left',
}

export interface ButtonProps extends PressableOpacityProps {
  title: string;
  type?: ButtonType;
  titleStyle?: StyleProp<TextStyle>;
  textColor?: Colors;
  textAlign?: TextAligns;
  icon?: ReactElement;
  iconPosition?: ButtonIconPosition;
  loading?: boolean;
}

const stylesByType: {
  [key in ButtonType]:
    | typeof stylesPrimary
    | typeof stylesSecondary
    | typeof stylesOutlined
    | typeof stylesText;
} = {
  [ButtonType.primary]: stylesPrimary,
  [ButtonType.secondary]: stylesSecondary,
  [ButtonType.outlined]: stylesOutlined,
  [ButtonType.text]: stylesText,
};

const textColorByType: { [key in ButtonType]: Colors } = {
  [ButtonType.primary]: Colors.white,
  [ButtonType.secondary]: Colors.text,
  [ButtonType.outlined]: Colors.primary,
  [ButtonType.text]: Colors.primary,
};

export const Button: React.FC<ButtonProps> = ({
  title,
  style,
  titleStyle,
  textColor,
  textAlign,
  icon,
  iconPosition,
  loading,
  disabled,
  type = ButtonType.primary,
  ...rest
}) => (
  <PressableOpacity
    {...rest}
    disabled={disabled || loading}
    style={[stylesByType[type].pressable, style]}>
    {iconPosition === ButtonIconPosition.left && icon}
    {!loading && (
      <Text
        size={TextSizes.small}
        align={textAlign ?? TextAligns.center}
        weight={TextWeights.bold}
        color={textColor ?? textColorByType[type]}
        style={[stylesByType[type].text, titleStyle]}>
        {title}
      </Text>
    )}
    {iconPosition === ButtonIconPosition.right && icon}
    {loading && (
      <View style={stylesByType[type].loadingContainer}>
        <ActivityIndicator size="small" color={textColor ?? Colors.white} />
      </View>
    )}
  </PressableOpacity>
);
