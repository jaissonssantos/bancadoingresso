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
import { Text, TextSizes } from '../Text';
import { SearchIcon, CloseIcon, IconSizes } from 'src/assets/icons';
import { styles } from './styles';

interface InputSearchProps extends Omit<TextInputProps, 'onChangeText'> {
  name: string;
  label?: string;
  containerStyle?: ViewProps['style'];
  labelStyle?: TextProps['style'];
  error?: string;
  renderForward?: () => React.ReactNode;
  onChangeText: UseFormReturn['onChangeInput'];
}

export const InputSearch = memo<InputSearchProps>(
  ({
    name,
    renderForward,
    containerStyle,
    style,
    error,
    maxLength,
    value,
    onChangeText,
    ...rest
  }) => (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.containerInput}>
        <View style={styles.search}>
          <SearchIcon size={IconSizes.xsmall} color={Colors.lightText} />
        </View>
        <TextInput
          style={[styles.input, !!error && styles.inputError, style]}
          placeholderTextColor={Colors.placeholder}
          maxLength={maxLength}
          onChangeText={(text: string): void => onChangeText(name, text)}
          value={value}
          {...rest}
        />

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
