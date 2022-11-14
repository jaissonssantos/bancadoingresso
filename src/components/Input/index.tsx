import React, { memo } from 'react';
import {
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';
import type { UseFormReturn } from 'src/hooks/useForm';
import { Colors } from 'src/styleguide/colors';
import { Text, TextSizes, TextWeights } from '../Text';
import { styles } from './styles';

export enum InputType {
  default = 'default',
  textarea = 'textarea',
}

interface InputProps extends Omit<TextInputProps, 'onChangeText'> {
  name: string;
  label?: string;
  containerStyle?: ViewProps['style'];
  labelStyle?: TextProps['style'];
  type?: InputType;
  error?: string;
  renderForward?: () => React.ReactNode;
  onChangeText: UseFormReturn['onChangeInput'];
}

const inputStyleByType: { [key in InputType]: object } = {
  [InputType.default]: {},
  [InputType.textarea]: styles.textarea,
};

const inputPropsByType: { [key in InputType]: Partial<TextInputProps> } = {
  [InputType.default]: {},
  [InputType.textarea]: { multiline: true },
};

export const Input = memo<InputProps>(
  ({
    name,
    label,
    renderForward,
    containerStyle,
    labelStyle,
    style,
    type = InputType.default,
    error,
    maxLength,
    value,
    onChangeText,
    ...rest
  }) => {
    const shouldShowError = !!error && typeof error === 'string';

    return (
      <View style={[styles.container, containerStyle]}>
        {!!label && (
          <Text
            size={TextSizes.small}
            weight={TextWeights.regular}
            style={[styles.label, labelStyle]}>
            {label}
          </Text>
        )}
        <View style={styles.containerInput}>
          <TextInput
            style={[
              styles.input,
              inputStyleByType[type],
              shouldShowError && styles.inputError,
              style,
            ]}
            placeholderTextColor={Colors.placeholder}
            maxLength={maxLength}
            onChangeText={(text: string): void => onChangeText(name, text)}
            value={value}
            {...inputPropsByType[type]}
            {...rest}
          />

          {renderForward && renderForward()}
        </View>

        {shouldShowError && (
          <View style={styles.rowBelowInput}>
            <Text
              size={TextSizes.small}
              color={Colors.errorRed}
              style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  },
);
