import React, { ReactElement } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Dialog } from 'src/components/Dialog';
import { BottomSheetInputCode } from 'src/components/BottomSheetInputCode';
import { SuccessIcon, IconSizes, NFCIcon } from 'src/assets/icons';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';
import { BottomSheetReceipt } from 'src/components/BottomSheetReceipt';

export enum States {
  loading = 'loading',
  success = 'success',
  password = 'password',
  finished = 'finished',
}

interface PaymentByDebitCardUIProps {
  cart: ICartState;
  state: States;
  visible: boolean;
  onPaymentContinue: () => void;
  onCancel: () => void;
}

export const PaymentByDebitCardUI: React.FC<PaymentByDebitCardUIProps> = ({
  cart,
  visible,
  state,
  onPaymentContinue,
  onCancel,
}) => {
  const renderLoading = (): ReactElement => (
    <React.Fragment>
      <ActivityIndicator size="large" color={Colors.white} />
      <Text
        size={TextSizes.medium}
        weight={TextWeights.bold}
        style={[styles.bold, styles.spacingTop]}>
        Processando
      </Text>
    </React.Fragment>
  );

  const renderSuccess = (): ReactElement => (
    <React.Fragment>
      <SuccessIcon size={IconSizes.xxmedium} fill={Colors.white} />
      <Text
        size={TextSizes.medium}
        weight={TextWeights.bold}
        style={[styles.bold, styles.spacingTop]}>
        Pagamento realizado
      </Text>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={[styles.container, styles.flex1]}>
          <Text
            size={TextSizes.small}
            weight={TextWeights.regular}
            align={TextAligns.center}
            style={[styles.spacingTop, styles.spacingBottom]}>
            Aproxime, insira ou passe o seu cartão
          </Text>

          <View style={styles.selfCenter}>
            <NFCIcon size={IconSizes.medium} fill={Colors.white} />
          </View>

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
        </View>
      </SafeAreaView>

      <Dialog
        visible={visible}
        title=""
        content={
          <View style={styles.dialog}>
            {
              {
                [States.loading]: renderLoading(),
                [States.success]: renderSuccess(),
                [States.password]: null,
                [States.finished]: null,
              }[state]
            }
          </View>
        }
        actions={[]}
      />

      <BottomSheetInputCode
        title="Digite a senha do seu cartão"
        visible={state === States.password}
        onContinue={onPaymentContinue}
      />

      <BottomSheetReceipt
        title="Ingresso e Via do cliente"
        subtitle="Escolha por onde deseja enviar o ingresso e via do cliente ou imprima"
        visible={state === States.finished}
        onDismiss={onCancel}
      />
    </React.Fragment>
  );
};
