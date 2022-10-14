import React, { memo } from 'react';
import { Pressable, TextInput, TextProps, View, ViewProps } from 'react-native';
import { useBottomSheet } from 'src/contexts/BottomSheetContext/useBottomSheet';
import type { UseFormReturn } from 'src/hooks/useForm';
import { Colors } from 'src/styleguide/colors';
import { Text, TextSizes, TextWeights } from '../Text';
import { SelectBottomSheetContent } from './components/SelectBottomSheetContent';
import { styles } from './styles';

export interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  name: string;
  value: string;
  title: string;
  placeholder: string;
  items: SelectItem[];
  label?: string;
  containerStyle?: ViewProps['style'];
  style?: ViewProps['style'];
  labelStyle?: TextProps['style'];
  error?: string;
  onChangeItem: UseFormReturn['onChangeInput'];
}

export const Select = memo<SelectProps>(
  ({
    name,
    label,
    title,
    items,
    placeholder,
    containerStyle,
    labelStyle,
    style,
    error,
    value,
    onChangeItem,
  }) => {
    const bottomSheet = useBottomSheet();

    const onPress = (): void => {
      bottomSheet.show({
        content: (
          <SelectBottomSheetContent
            title={title}
            items={items}
            onChangeItem={(item): void => onChangeItem(name, item)}
            onClose={(): void => bottomSheet.hide()}
          />
        ),
      });
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {!!label && (
          <Text
            size={TextSizes.small}
            weight={TextWeights.bold}
            style={[styles.label, labelStyle]}>
            {label}
          </Text>
        )}
        <Pressable onPress={onPress}>
          <TextInput
            pointerEvents="none"
            style={[styles.input, !!error && styles.inputError, style]}
            placeholderTextColor={Colors.placeholder}
            placeholder={placeholder}
            value={value}
            editable={false}
          />
        </Pressable>
        {!!error && (
          <Text
            size={TextSizes.small}
            color={Colors.errorRed}
            style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);
