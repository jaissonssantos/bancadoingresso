import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useForm } from 'src/hooks/useForm';
import * as validators from 'src/util/validators';
import { phoneFormatter } from 'src/util/formatters';
import { BottomSheetBackdrop } from 'src/components/BottomSheetBackdrop';
import {
  ArrowLeftIcon,
  PrintIcon,
  WhatsAppIcon,
  SendMessageIcon,
  SuccessIcon,
  IconSizes,
  CheckIcon,
  ReloadIcon,
  ChangeIcon,
} from 'src/assets/icons';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import { Input } from 'src/components/Input';
import { Button, ButtonIconPosition, ButtonType } from 'src/components/Button';
import { Text, TextAligns, TextSizes } from 'src/components/Text';
import { Colors } from 'src/styleguide/colors';
import { Dialog } from '../Dialog';
import { PressableOpacity } from '../PressableOpacity';
import styles from './styles';

interface BottomSheetReceiptProps {
  title: string;
  subtitle?: string;
  visible: boolean;
  onDismiss?: () => void;
}

export enum Steps {
  default = 'default',
  sms = 'sms',
  whatsapp = 'whatsapp',
  loadingBySMS = 'loadingBySMS',
  loadingByWhatsapp = 'loadingByWhatsapp',
  finishedBySMS = 'finishedBySMS',
  finishedByWhatsapp = 'finishedByWhatsapp',
}

enum SendMethods {
  sms = 'sms',
  whatsapp = 'whatsapp',
}

export type FormData = {
  cellphone: string;
};

export const BottomSheetReceipt: React.FC<BottomSheetReceiptProps> = ({
  title,
  subtitle,
  visible,
  onDismiss,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [step, setStep] = useState<Steps>(Steps.default);
  const [dialog, setDialog] = useState(false);
  const [sendMethod, setSendMethod] = useState<SendMethods>(SendMethods.sms);

  const snapPoints = useMemo(() => ['50%'], []);

  const { formData, formErrors, onChangeInput, isFormValid } =
    useForm<FormData>({
      initialData: { cellphone: '' },
      validators: {
        cellphone: [validators.required, validators.phone],
      },
      formatters: { cellphone: phoneFormatter },
    });

  const handleOnChange = useCallback((index: number) => {
    if (index === -1) {
      onDismiss?.();
    }
  }, []);

  const handleOnClosePress = useCallback(() => {
    console.log('handleOnClosePress');
  }, []);

  const handleOnSendPressWhatsapp = useCallback(() => {
    setStep(Steps.whatsapp);
  }, []);

  const handleOnSendPressSMS = useCallback(() => {
    setStep(Steps.sms);
  }, []);

  const handleOnSendMessage = (value: Steps): void => {
    if (isFormValid()) {
      if (!dialog) {
        setDialog(true);
      }
      sheetRef.current?.collapse();

      setStep(
        value === Steps.sms ? Steps.loadingBySMS : Steps.loadingByWhatsapp,
      );
      setSendMethod(
        value === Steps.sms ? SendMethods.sms : SendMethods.whatsapp,
      );

      new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
        setStep(
          value === Steps.sms ? Steps.finishedBySMS : Steps.finishedByWhatsapp,
        );
      });
    }
  };

  const handleOnBackStep = useCallback(() => {
    setStep(Steps.default);
  }, []);

  const handleOnChangeSendReceipt = useCallback(() => {
    setDialog(false);
    setStep(Steps.default);
    sheetRef.current?.present();
  }, []);

  const handleOnResendReceipt = (value: SendMethods): void => {
    handleOnSendMessage(value === SendMethods.sms ? Steps.sms : Steps.whatsapp);
  };

  const handleOnCloseReceipt = useCallback(() => {
    setDialog(false);
    setStep(Steps.default);
    setSendMethod(SendMethods.sms);
    sheetRef.current?.dismiss();
    onDismiss?.();
  }, []);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [visible]);

  const renderDefault = (): React.ReactElement => (
    <View style={styles.container}>
      <Text
        size={TextSizes.large}
        align={TextAligns.center}
        style={styles.bold}>
        {title}
      </Text>
      {subtitle && (
        <Text
          size={TextSizes.small}
          align={TextAligns.center}
          style={styles.spacingTop}>
          {subtitle}
        </Text>
      )}

      <Button
        title="Imprimir"
        type={ButtonType.outlined}
        onPress={handleOnClosePress}
        titleStyle={styles.buttonTitleStyle}
        style={[
          styles.spacingTop,
          styles.buttonStyle,
          styles.buttonOutlinedStyle,
        ]}
        iconPosition={ButtonIconPosition.left}
        icon={<PrintIcon size={IconSizes.xsmall} />}
      />
      <Button
        title="Enviar por WhatsApp"
        type={ButtonType.outlined}
        onPress={handleOnSendPressWhatsapp}
        titleStyle={styles.buttonTitleStyle}
        style={[
          styles.spacingTop,
          styles.buttonStyle,
          styles.buttonOutlinedStyle,
        ]}
        iconPosition={ButtonIconPosition.left}
        icon={<WhatsAppIcon size={IconSizes.xsmall} color={Colors.white} />}
      />
      <Button
        title="Enviar por SMS"
        type={ButtonType.outlined}
        onPress={handleOnSendPressSMS}
        titleStyle={styles.buttonTitleStyle}
        style={[
          styles.spacingTop,
          styles.buttonStyle,
          styles.buttonOutlinedStyle,
        ]}
        iconPosition={ButtonIconPosition.left}
        icon={<SendMessageIcon size={IconSizes.xsmall} />}
      />
    </View>
  );

  const renderWhatsApp = (): React.ReactElement => (
    <KeyboardAwareScrollView style={[styles.container, styles.flex1]}>
      <View style={styles.row}>
        <PressableOpacity onPress={handleOnBackStep}>
          <ArrowLeftIcon size={IconSizes.small} fill={Colors.white} />
        </PressableOpacity>
        <Text
          size={TextSizes.large}
          align={TextAligns.center}
          style={[styles.bold, styles.flex1]}>
          Enviar por WhatsApp
        </Text>
      </View>
      <Text
        size={TextSizes.small}
        align={TextAligns.center}
        style={[styles.spacingTop, styles.spacingBottom]}>
        Digite abaixo o WhatsApp do cliente
      </Text>

      <Input
        label="WhatsApp (celular)"
        name="cellphone"
        placeholder="(00) 00000-0000"
        value={formData.cellphone}
        error={formErrors.cellphone?.[0]}
        maxLength={15}
        returnKeyType="done"
        keyboardType="numeric"
        onChangeText={onChangeInput}
      />

      <View style={styles.flex1} />

      <Button
        title="Enviar"
        onPress={(): void => handleOnSendMessage(Steps.whatsapp)}
        titleStyle={styles.buttonTitleStyle}
      />
    </KeyboardAwareScrollView>
  );

  const renderSms = (): React.ReactElement => (
    <KeyboardAwareScrollView style={[styles.container, styles.flex1]}>
      <View style={styles.row}>
        <PressableOpacity onPress={handleOnBackStep}>
          <ArrowLeftIcon size={IconSizes.small} fill={Colors.white} />
        </PressableOpacity>
        <Text
          size={TextSizes.large}
          align={TextAligns.center}
          style={[styles.bold, styles.flex1]}>
          Enviar por SMS
        </Text>
      </View>
      <Text
        size={TextSizes.small}
        align={TextAligns.center}
        style={[styles.spacingTop, styles.spacingBottom]}>
        Digite abaixo o celular do cliente
      </Text>

      <Input
        label="Celular"
        name="cellphone"
        placeholder="(00) 00000-0000"
        value={formData.cellphone}
        error={formErrors.cellphone?.[0]}
        maxLength={15}
        returnKeyType="done"
        keyboardType="numeric"
        onChangeText={onChangeInput}
      />

      <View style={styles.flex1} />

      <Button
        title="Enviar"
        onPress={(): void => handleOnSendMessage(Steps.sms)}
        titleStyle={styles.buttonTitleStyle}
      />
    </KeyboardAwareScrollView>
  );

  const renderLoading = (): React.ReactElement => (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.white} />

      <Text
        size={TextSizes.small}
        align={TextAligns.center}
        style={[styles.spacingTop, styles.bold]}>
        Enviando {sendMethod === SendMethods.whatsapp ? 'por WhatsApp' : 'SMS'}
      </Text>
    </View>
  );

  const renderFinished = (): React.ReactElement => (
    <View style={[styles.container, styles.justifyCenter]}>
      <View style={styles.alignSelfCenter}>
        <SuccessIcon size={IconSizes.xxmedium} fill={Colors.white} />
      </View>

      <Text
        size={TextSizes.medium}
        align={TextAligns.center}
        style={[styles.spacingTop, styles.spacingBottomLarge, styles.bold]}>
        {sendMethod === SendMethods.whatsapp ? 'WhatsApp' : 'SMS'} {'enviado'}
      </Text>

      <Button
        title="A mensagem chegou para o cliente"
        type={ButtonType.secondary}
        onPress={handleOnCloseReceipt}
        style={styles.buttonStyle}
        titleStyle={[styles.buttonTitleStyle, styles.buttonTitleSecondaryStyle]}
        iconPosition={ButtonIconPosition.left}
        icon={<CheckIcon size={IconSizes.nano} fill={Colors.black} />}
      />

      <Button
        title="Reenviar mensagem"
        type={ButtonType.outlined}
        onPress={(): void => handleOnResendReceipt(sendMethod)}
        titleStyle={styles.buttonTitleStyle}
        style={[
          styles.buttonStyle,
          styles.buttonOutlinedStyle,
          styles.spacingTop,
        ]}
        iconPosition={ButtonIconPosition.left}
        icon={<ReloadIcon size={IconSizes.nano} fill={Colors.white} />}
      />

      <Button
        title="Alterar método de envio"
        type={ButtonType.text}
        onPress={handleOnChangeSendReceipt}
        titleStyle={styles.buttonTitleStyle}
        style={[
          styles.buttonStyle,
          styles.buttonOutlinedStyle,
          styles.spacingTop,
        ]}
        iconPosition={ButtonIconPosition.left}
        icon={<ChangeIcon size={IconSizes.nano} fill={Colors.white} />}
      />
    </View>
  );

  return (
    <React.Fragment>
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        index={0}
        onChange={handleOnChange}
        backdropComponent={BottomSheetBackdrop}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        backgroundStyle={styles.bottomSheet}
        enablePanDownToClose>
        {
          {
            [Steps.default]: renderDefault(),
            [Steps.sms]: renderSms(),
            [Steps.whatsapp]: renderWhatsApp(),
            [Steps.loadingBySMS]: null,
            [Steps.loadingByWhatsapp]: null,
            [Steps.finishedBySMS]: null,
            [Steps.finishedByWhatsapp]: null,
          }[step]
        }
      </BottomSheetModal>

      <Dialog
        visible={dialog}
        title=""
        content={
          <View style={styles.dialog}>
            {
              {
                [Steps.default]: null,
                [Steps.sms]: null,
                [Steps.whatsapp]: null,
                [Steps.loadingBySMS]: renderLoading(),
                [Steps.loadingByWhatsapp]: renderLoading(),
                [Steps.finishedBySMS]: renderFinished(),
                [Steps.finishedByWhatsapp]: renderFinished(),
              }[step]
            }
          </View>
        }
        actions={[]}
      />
    </React.Fragment>
  );
};
