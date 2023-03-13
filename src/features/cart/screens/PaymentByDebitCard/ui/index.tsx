import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { SuccessIcon, IconSizes, NFCIcon, ErrorIcon } from 'src/assets/icons';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import { Button, ButtonType } from 'src/components/Button';
import type { OrderPayment } from 'src/features/cart/types';
import { styles } from './styles';

export enum States {
  awaiting_credit_card = 'awaiting_credit_card',
  updating_tables = 'updating_tables',
  processing = 'processing',
  requires_code_pin = 'requires_code_pin',
  error = 'error',
  generic_error = 'generic_error',
  cancelled = 'cancelled',
  order_save_loading = 'order_save_loading',
  order_save_error = 'order_save_error',
  finished = 'finished',
}

export interface PaymentByDebitCardEventListener extends OrderPayment {
  code?: number | null;
  message?: string;
}

export interface PinCodePinRequestedEventListener {
  isPinRequested: boolean;
}

export interface AbortPaymentEventListener {
  isAvailableAbort: boolean;
}

export interface PrintSuccessEventListener
  extends PaymentByDebitCardEventListener {}

export interface PrintErrorEventListener
  extends PaymentByDebitCardEventListener {}

interface PaymentByDebitCardUIProps {
  state: States;
  totalAmountFromSplitPayment: number;
  totalAmountFee: number;
  totalAmountToPay: number;
  statusPayment: string | null;
  errorPayment: string | null;
  codePin: string | null;
  isAvailableAbort: boolean;
  errorOrderSave: string | null;
  onRetryPayment: () => void;
  onGoToHome: () => void;
  onCancel: () => void;
  onGoToPaymentTypeChoice: () => void;
  onRetryOrderSave: () => void;
}

export const PaymentByDebitCardUI: React.FC<PaymentByDebitCardUIProps> = ({
  state,
  totalAmountFromSplitPayment,
  totalAmountFee,
  totalAmountToPay,
  statusPayment,
  errorPayment,
  codePin,
  isAvailableAbort,
  errorOrderSave,
  onRetryPayment,
  onGoToHome,
  onCancel,
  onGoToPaymentTypeChoice,
  onRetryOrderSave,
}) => {
  const nfcIcon = <NFCIcon size={IconSizes.medium} fill={Colors.white} />;
  const errorIcon = (
    <ErrorIcon size={IconSizes.medium} fill={Colors.errorRed} />
  );
  const processingIcon = (
    <ActivityIndicator size="large" color={Colors.white} />
  );

  const renderSuccess = (
    <React.Fragment>
      <View style={[styles.container, styles.alignCenter]}>
        <View style={styles.spacingBottom}>
          <SuccessIcon size={IconSizes.large} fill={Colors.white} />
        </View>
        <Text
          size={TextSizes.medium}
          weight={TextWeights.bold}
          align={TextAligns.center}
          style={[styles.bold, styles.spacingTop]}>
          Venda realizada com sucesso
        </Text>
      </View>
      <View style={[styles.spacingContainer]}>
        {totalAmountFromSplitPayment < totalAmountFee ? (
          <Button
            type={ButtonType.primary}
            onPress={onGoToPaymentTypeChoice}
            title="Voltar para concluir a venda"
          />
        ) : (
          <Button
            type={ButtonType.secondary}
            onPress={onGoToHome}
            title="Voltar para o início"
          />
        )}
      </View>
    </React.Fragment>
  );

  const renderDefault = (
    <React.Fragment>
      <View style={[styles.container, styles.flex1]}>
        {state === States.requires_code_pin && (
          <React.Fragment>
            <Text
              size={TextSizes.medium}
              weight={TextWeights.bold}
              align={TextAligns.center}
              style={[styles.spacingTop, styles.spacingBottom]}>
              Digite a senha
            </Text>

            <Text
              size={TextSizes.xxlarge}
              weight={TextWeights.bold}
              align={TextAligns.center}
              style={[styles.passwordText, styles.spacingBottom]}>
              {codePin}
            </Text>
          </React.Fragment>
        )}

        {state !== States.requires_code_pin && (
          <React.Fragment>
            <Text
              size={TextSizes.small}
              weight={TextWeights.regular}
              align={TextAligns.center}
              style={[
                styles.spacingTop,
                styles.spacingBottom,
                styles.textUppercase,
              ]}>
              {errorOrderSave || errorPayment || statusPayment}
            </Text>

            <View style={styles.selfCenter}>
              {
                {
                  [States.updating_tables]: processingIcon,
                  [States.processing]: processingIcon,
                  [States.finished]: null,
                  [States.error]: nfcIcon,
                  [States.cancelled]: nfcIcon,
                  [States.awaiting_credit_card]: nfcIcon,
                  [States.generic_error]: errorIcon,
                  [States.order_save_loading]: processingIcon,
                  [States.order_save_error]: errorIcon,
                }[state]
              }
            </View>
          </React.Fragment>
        )}

        <Text
          size={TextSizes.small}
          weight={TextWeights.regular}
          align={TextAligns.center}
          style={[styles.spacingTop, styles.spacingBottom]}>
          Valor a ser pago:{' '}
          <Text
            size={TextSizes.small}
            weight={TextWeights.regular}
            style={styles.bold}>
            {toString(totalAmountToPay)}
          </Text>
        </Text>
      </View>

      {state === States.generic_error && (
        <View style={[styles.spacingContainer]}>
          <Button
            type={ButtonType.primary}
            onPress={onRetryPayment}
            title="Tentar novamente"
          />
        </View>
      )}

      {isAvailableAbort && (
        <View style={[styles.spacingContainer]}>
          <Button
            type={ButtonType.primary}
            onPress={onCancel}
            title="Cancelar pagamento"
          />
        </View>
      )}

      {errorOrderSave && !isAvailableAbort && (
        <View style={[styles.spacingContainer]}>
          <Button
            type={ButtonType.primary}
            onPress={onRetryOrderSave}
            title="Tentar novamente o envio do pedido"
          />
        </View>
      )}
    </React.Fragment>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {
        {
          [States.updating_tables]: renderDefault,
          [States.requires_code_pin]: renderDefault,
          [States.processing]: renderDefault,
          [States.error]: renderDefault,
          [States.cancelled]: renderDefault,
          [States.awaiting_credit_card]: renderDefault,
          [States.generic_error]: renderDefault,
          [States.order_save_loading]: renderDefault,
          [States.order_save_error]: renderDefault,
          [States.finished]: renderSuccess,
        }[state]
      }
    </SafeAreaView>
  );
};
