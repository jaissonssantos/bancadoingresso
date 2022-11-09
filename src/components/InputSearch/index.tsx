import React, { memo } from 'react';
import {
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import type { UseFormReturn } from 'src/hooks/useForm';
import { Colors } from 'src/styleguide/colors';
import { Text, TextSizes } from 'src/components/Text';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { SearchIcon, CloseIcon, IconSizes } from 'src/assets/icons';
import { styles } from './styles';

interface InputSearchProps extends Omit<TextInputProps, 'onChangeText'> {
  name: string;
  label?: string;
  containerStyle?: ViewProps['style'];
  labelStyle?: TextProps['style'];
  error?: string;
  onChangeText: UseFormReturn['onChangeInput'];
  onSearchClean?: () => void;
}

export const InputSearch = memo<InputSearchProps>(
  ({
    name,
    containerStyle,
    style,
    error,
    maxLength,
    value,
    onChangeText,
    onSearchClean,
    ...rest
  }) => {
    const isFocused = useSharedValue(false);

    const containerInputAnimatedStyles = useAnimatedStyle(() => {
      const width = isFocused.value ? '80%' : '100%';
      const isAnimated = isFocused.value ? 1 : 0;
      const backgroundColor = interpolateColor(
        isAnimated,
        [0, 1],
        [Colors.transparent, Colors.blackLight],
      );

      return {
        width: withTiming(width, { duration: 200 }),
        backgroundColor,
      };
    });

    const cancelAnimatedStyles = useAnimatedStyle(() => {
      const isAnimated = isFocused.value ? 1 : 0;

      return {
        opacity: interpolate(isAnimated, [0, 1], [0, 1]),
      };
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.content}>
          <Animated.View
            style={[styles.containerInput, containerInputAnimatedStyles]}>
            <View style={styles.search}>
              <SearchIcon size={IconSizes.xsmall} color={Colors.lightText} />
            </View>
            <Animated.View>
              <TextInput
                style={[styles.input, !!error && styles.inputError, style]}
                placeholderTextColor={Colors.placeholder}
                maxLength={maxLength}
                onFocus={(): boolean => (isFocused.value = true)}
                onEndEditing={(): boolean => (isFocused.value = false)}
                onChangeText={(text: string): void => onChangeText(name, text)}
                value={value}
                {...rest}
              />
            </Animated.View>

            {value && value?.length > 0 && (
              <PressableOpacity
                onPress={onSearchClean}
                style={styles.searchClean}>
                <CloseIcon size={IconSizes.nano} fill={Colors.whiteDarkLight} />
              </PressableOpacity>
            )}
          </Animated.View>

          <Animated.Text
            onPress={(): boolean => (isFocused.value = false)}
            style={[styles.cancelText, cancelAnimatedStyles]}>
            Cancelar
          </Animated.Text>
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
    );
  },
);
