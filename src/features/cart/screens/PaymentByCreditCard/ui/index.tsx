import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { SuccessIcon, IconSizes, NFCIcon } from 'src/assets/icons';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import type { Installment } from 'src/features/cart/model/installmentDTO';
import { log } from 'src/util/log';
import { styles } from './styles';

export enum States {
  awaiting_credit_card = 'awaiting_credit_card',
  updating_tables = 'updating_tables',
  processing = 'processing',
  requires_password = 'requires_password',
  error = 'error',
  cancelled = 'cancelled',
  finished = 'finished',
}

interface PaymentByCreditCardUIProps {
  state: States;
  cart: ICartState;
  installment: Installment;
  statusPayment: string | null;
  successPayment: string | null;
  errorPayment: string | null;
  passwordToPayment: string | null;
  onCancel: () => void;
}

export interface PaymentByCreditCardEventListener {
  message: string;
  code: string;
}

export const PaymentByCreditCardUI: React.FC<PaymentByCreditCardUIProps> = ({
  state,
  cart,
  installment,
  statusPayment,
  successPayment,
  errorPayment,
  passwordToPayment,
  // onCancel,
}) => {
  const nfcIcon = <NFCIcon size={IconSizes.medium} fill={Colors.white} />;
  const successIcon = (
    <SuccessIcon size={IconSizes.xxmedium} fill={Colors.white} />
  );
  const processingIcon = (
    <ActivityIndicator size="large" color={Colors.white} />
  );
  // const renderLoading = (): ReactElement => (
  //   <React.Fragment>
  //     <ActivityIndicator size="large" color={Colors.white} />
  //     <Text
  //       size={TextSizes.medium}
  //       weight={TextWeights.bold}
  //       style={[styles.bold, styles.spacingTop]}>
  //       Processando
  //     </Text>
  //   </React.Fragment>
  // );

  // const renderSuccess = (): ReactElement => (
  //   <React.Fragment>
  //     <SuccessIcon size={IconSizes.xxmedium} fill={Colors.white} />
  //     <Text
  //       size={TextSizes.medium}
  //       weight={TextWeights.bold}
  //       style={[styles.bold, styles.spacingTop]}>
  //       Pagamento realizado
  //     </Text>
  //   </React.Fragment>
  // );

  // log.i('statusPayment >>>', statusPayment as string);
  log.i('successPayment >>>', successPayment as string);
  log.i('errorPayment >>>', errorPayment as string);
  // log.i('passwordToPayment >>>', passwordToPayment as string);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={[styles.container, styles.flex1]}>
        {state === States.requires_password && (
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
              {passwordToPayment}
            </Text>
          </React.Fragment>
        )}

        {state !== States.requires_password && (
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
              {errorPayment || successPayment || statusPayment}
            </Text>

            <View style={styles.selfCenter}>
              {
                {
                  [States.updating_tables]: processingIcon,
                  [States.processing]: processingIcon,
                  [States.finished]: successIcon,
                  [States.error]: nfcIcon,
                  [States.cancelled]: nfcIcon,
                  [States.awaiting_credit_card]: nfcIcon,
                }[state]
              }
            </View>
          </React.Fragment>
        )}

        {installment.quantity > 1 ? (
          <React.Fragment>
            <Text
              size={TextSizes.small}
              weight={TextWeights.regular}
              align={TextAligns.center}
              style={styles.spacingTop}>
              Valor a ser pago:{' '}
              <Text
                size={TextSizes.small}
                weight={TextWeights.regular}
                style={styles.bold}>
                {installment.quantity}x {toString(installment.value)}
              </Text>
            </Text>

            <Text
              size={TextSizes.small}
              weight={TextWeights.regular}
              align={TextAligns.center}
              style={[styles.spacingTop, styles.spacingBottom]}>
              Valor total sem juros:{' '}
              <Text
                size={TextSizes.small}
                weight={TextWeights.regular}
                style={styles.bold}>
                {toString(cart.totalAmount)}
              </Text>
            </Text>
          </React.Fragment>
        ) : (
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
              {toString(cart.totalAmount)}
            </Text>
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
