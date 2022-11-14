import React, { useRef, useEffect } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styles from './styles';

export enum InputType {
  confirmationCode = 'confirmationCode',
  prepaidCardPassword = 'prepaidCardPassword',
}

type InputCodeByType = 'confirmationCode' | 'prepaidCardPassword';

interface InputCodeProps extends Omit<TextInputProps, 'ref'> {
  value: string;
  type: InputCodeByType | InputType;
  editable?: boolean;
  hiddenCode?: boolean;
  error?: string | null;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
}

export const InputCode: React.FC<InputCodeProps> = ({
  value,
  type,
  editable = true,
  hiddenCode = false,
  error,
  style,
  onChangeText,
}: InputCodeProps) => {
  const refInput = useRef<TextInput>();
  const onFocus = (): void => refInput.current && refInput.current?.focus();

  useEffect(() => {
    const blurInput = (): void => refInput?.current && refInput?.current.blur();

    setTimeout(onFocus, 100);
    Keyboard.addListener('keyboardDidHide', blurInput);
    return (): void => Keyboard.removeAllListeners('keyboardDidHide');
  }, []);

  const showCharacter = (position: number): string => {
    if (type === InputType.confirmationCode) {
      return hiddenCode ? '●' : value[position];
    } else {
      return hiddenCode ? '●' : value[position];
    }
  };

  return (
    <View>
      <View>{!!error && <Text style={styles.errorMessage}>{error}</Text>}</View>
      <TouchableWithoutFeedback onPress={onFocus}>
        <View style={styles.container}>
          <TextInput
            ref={refInput as any}
            blurOnSubmit
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            returnKeyType="done"
            keyboardType="numeric"
            importantForAutofill="no"
            secureTextEntry
            autoCorrect={false}
            autoComplete="off"
            selectTextOnFocus={false}
            maxLength={type === InputType.confirmationCode ? 6 : 4}
            editable={editable}
          />
          <View style={[styles.container, style]}>
            <Text
              style={[
                type === InputType.confirmationCode
                  ? styles.codeSymbolConfirmationCode
                  : styles.codeSymbol,
                value.length === 0 ? styles.codeSymbolActive : null,
                error ? styles.codeSymbolError : null,
                !editable ? styles.codeSymbolEditable : null,
              ]}>
              {showCharacter(0)}
            </Text>
            <Text
              style={[
                type === InputType.confirmationCode
                  ? styles.codeSymbolConfirmationCode
                  : styles.codeSymbol,
                value.length === 1 ? styles.codeSymbolActive : null,
                error ? styles.codeSymbolError : null,
                !editable ? styles.codeSymbolEditable : null,
              ]}
              onPress={onFocus}>
              {showCharacter(1)}
            </Text>
            <Text
              style={[
                type === InputType.confirmationCode
                  ? styles.codeSymbolConfirmationCode
                  : styles.codeSymbol,
                value.length === 2 ? styles.codeSymbolActive : null,
                error ? styles.codeSymbolError : null,
                !editable ? styles.codeSymbolEditable : null,
              ]}>
              {showCharacter(2)}
            </Text>
            <Text
              style={[
                type === InputType.confirmationCode
                  ? styles.codeSymbolConfirmationCode
                  : styles.codeSymbol,
                value.length === 3 ? styles.codeSymbolActive : null,
                error ? styles.codeSymbolError : null,
                !editable ? styles.codeSymbolEditable : null,
              ]}>
              {showCharacter(3)}
            </Text>
            {type === InputType.confirmationCode && (
              <Text
                style={[
                  type === InputType.confirmationCode
                    ? styles.codeSymbolConfirmationCode
                    : styles.codeSymbol,
                  value.length === 4 ? styles.codeSymbolActive : null,
                  error ? styles.codeSymbolError : null,
                  !editable ? styles.codeSymbolEditable : null,
                ]}>
                {showCharacter(4)}
              </Text>
            )}
            {type === InputType.confirmationCode && (
              <Text
                style={[
                  type === InputType.confirmationCode
                    ? styles.codeSymbolConfirmationCode
                    : styles.codeSymbol,
                  value.length === 5 ? styles.codeSymbolActive : null,
                  error ? styles.codeSymbolError : null,
                  !editable ? styles.codeSymbolEditable : null,
                ]}>
                {showCharacter(5)}
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
