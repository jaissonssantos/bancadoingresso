import React, { ReactElement } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Button } from 'src/components/Button';
import { Dialog } from 'src/components/Dialog';
import { BottomSheetReceipt } from 'src/components/BottomSheetReceipt';
import { SuccessIcon, IconSizes } from 'src/assets/icons';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export enum States {
  loading = 'loading',
  success = 'success',
  finished = 'finished',
}

interface PaymentByCashUIProps {
  cart: ICartState;
  amount: number;
  state: States;
  visible: boolean;
  onPaymentFinish: () => void;
  onClose: () => void;
}

export const PaymentByCashUI: React.FC<PaymentByCashUIProps> = ({
  cart,
  amount,
  visible,
  state,
  onPaymentFinish,
  onClose,
}) => {
  const renderLoading = (): ReactElement => (
    <React.Fragment>
      <ActivityIndicator size="large" color={Colors.white} />
      <Text
        size={TextSizes.medium}
        weight={TextWeights.bold}
        style={[styles.title, styles.spacingTop]}>
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
        style={[styles.title, styles.spacingTop]}>
        Pagamento realizado
      </Text>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={[styles.container, styles.flex1]}>
          <View style={[styles.row, styles.spacingContainer]}>
            <Text
              size={TextSizes.small}
              weight={TextWeights.regular}
              align={TextAligns.center}
              style={styles.spacingTop}>
              Valor pago:
            </Text>
            <Text
              size={TextSizes.small}
              weight={TextWeights.medium}
              align={TextAligns.center}
              style={styles.spacingTop}>
              {toString(amount)}
            </Text>
          </View>

          <View
            style={[styles.row, styles.spacingContainer, styles.spacingBottom]}>
            <Text
              size={TextSizes.small}
              weight={TextWeights.regular}
              align={TextAligns.center}
              style={styles.spacingTop}>
              Troco:
            </Text>
            <Text
              size={TextSizes.small}
              weight={TextWeights.medium}
              align={TextAligns.center}
              style={styles.spacingTop}>
              {toString(amount - cart.totalAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.containerButton}>
          <Button
            title="Finalizar pedido"
            disabled={cart.totalQuantity === 0}
            onPress={onPaymentFinish}
          />
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
                [States.finished]: null,
              }[state]
            }
          </View>
        }
        actions={[]}
      />

      <BottomSheetReceipt
        title="Ingresso e Via do cliente"
        subtitle="Escolha por onde deseja enviar o ingresso e via do cliente ou imprima"
        visible={state === States.finished}
        onDismiss={onClose}
      />
    </React.Fragment>
  );
};
