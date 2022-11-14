import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useForm } from 'src/hooks/useForm';
import * as validators from 'src/util/validators';
import { BottomSheetBackdrop } from 'src/components/BottomSheetBackdrop';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import { InputCode, InputType } from 'src/components/InputCode';
import { Button, ButtonType } from 'src/components/Button';
import { Text, TextAligns, TextSizes } from 'src/components/Text';
import styles from './styles';

interface BottomSheetInputCodeProps {
  title: string;
  visible: boolean;
  onContinue?: () => void;
  onDismiss?: () => void;
}

export type FormData = {
  code: string;
};

export const BottomSheetInputCode: React.FC<BottomSheetInputCodeProps> = ({
  title,
  visible,
  onContinue,
  onDismiss,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [showCode, setShowCode] = useState(false);

  const snapPoints = useMemo(() => ['50%'], []);

  const { formData, formErrors, onChangeInput, isFormValid } =
    useForm<FormData>({
      initialData: { code: '' },
      validators: {
        code: [validators.required],
      },
    });

  const handleOnChange = useCallback((index: number) => {
    if (index === -1) {
      console.log('handleOnChange => index', index);
      onDismiss?.();
    }
  }, []);

  const handleOnContinue = (): void => {
    if (isFormValid()) {
      onContinue?.();
      sheetRef.current?.collapse();
    }
  };

  const handleOnCancel = (): void => {
    sheetRef.current?.dismiss();
  };

  const handleOnChangeInput = (value: string): void => {
    onChangeInput('code', value);
  };

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      onChange={handleOnChange}
      backdropComponent={BottomSheetBackdrop}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      backgroundStyle={styles.bottomSheet}
      enablePanDownToClose>
      <KeyboardAwareScrollView style={[styles.container, styles.flex1]}>
        <Text
          size={TextSizes.large}
          align={TextAligns.center}
          style={[styles.bold, styles.flex1, styles.spacingBottom]}>
          {title}
        </Text>

        <InputCode
          type={InputType.confirmationCode}
          value={formData.code}
          error={formErrors.code?.[0]}
          hiddenCode={!showCode}
          returnKeyType="done"
          keyboardType="numeric"
          onChangeText={(text: string): void => handleOnChangeInput(text)}
        />

        {showCode ? (
          <Text
            size={TextSizes.small}
            align={TextAligns.center}
            onPress={(): void => setShowCode(!showCode)}
            style={[styles.spacingTop, styles.spacingBottom]}>
            Ocultar senha
          </Text>
        ) : (
          <Text
            size={TextSizes.small}
            align={TextAligns.center}
            onPress={(): void => setShowCode(!showCode)}
            style={[styles.spacingTop, styles.spacingBottom]}>
            Exibir senha
          </Text>
        )}

        <View style={styles.flex1} />

        <View style={styles.row}>
          <Button
            title="Cancelar"
            type={ButtonType.outlined}
            onPress={handleOnCancel}
            titleStyle={styles.buttonTitleStyle}
            style={[styles.buttonOutlinedStyle, styles.flex1]}
          />

          <View style={styles.buttonSeparator} />

          <Button
            title="Confirmar"
            onPress={handleOnContinue}
            titleStyle={styles.buttonTitleStyle}
            style={styles.flex1}
          />
        </View>
      </KeyboardAwareScrollView>
    </BottomSheetModal>
  );
};
