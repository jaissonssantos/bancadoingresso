import React, { memo } from 'react';
import { TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { InputEditIcon, IconSizes } from 'src/assets/icons';
import { Colors } from 'src/styleguide/colors';
import { Text, TextSizes } from '../Text';
import { styles } from './styles';

interface AmountInputProps extends Omit<TextInputProps, 'onChangeText'> {
  name: string;
  label?: string;
  containerStyle?: ViewProps['style'];
  error?: string;
  editable?: boolean;
  renderForward?: () => React.ReactNode;
  onChangeText: (text: string) => void;
}

export const AmountInput = memo<AmountInputProps>(
  ({
    renderForward,
    containerStyle,
    style,
    error,
    editable,
    maxLength,
    value,
    onChangeText,
    ...rest
  }) => (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.containerInput}>
        <TextInput
          style={[styles.input, !!error && styles.inputError, style]}
          placeholderTextColor={Colors.placeholder}
          maxLength={maxLength}
          onChangeText={(text: string): void => onChangeText(text)}
          value={value}
          editable={editable}
          {...rest}
        />
        {!renderForward && (
          <View style={styles.inputIconEdit}>
            <InputEditIcon size={IconSizes.xsmall} fill={Colors.white} />
          </View>
        )}

        {renderForward && renderForward()}
      </View>
      {!!(error || maxLength) && (
        <View style={styles.rowBelowInput}>
          {!!error && (
            <Text
              size={TextSizes.small}
              color={Colors.errorRed}
              style={styles.errorText}>
              {error}
            </Text>
          )}
        </View>
      )}
    </View>
  ),
);
