import React, { ReactElement } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Dialog } from 'src/components/Dialog';
import { SuccessIcon, QrCodeIcon, IconSizes } from 'src/assets/icons';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { Colors } from 'src/styleguide/colors';
import { styles } from './styles';

export enum States {
  loading = 'loading',
  success = 'success',
}

interface PaymentByPixUIProps {
  cart: ICartState;
  state: States;
  visible: boolean;
  onPaymentFinish: () => void;
}

export const PaymentByPixUI: React.FC<PaymentByPixUIProps> = ({
  cart,
  visible,
  state,
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
        <View style={styles.contentTitle}>
          <Text
            size={TextSizes.medium}
            weight={TextWeights.bold}
            align={TextAligns.center}
            style={styles.bold}>
            Escaneie o QR Code abaixo para realizar o pagamento
          </Text>
        </View>

        <View style={[styles.container, styles.flex1]}>
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

          <View style={styles.selfCenter}>
            <QrCodeIcon size={IconSizes.large} fill={Colors.white} />
          </View>
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
              }[state]
            }
          </View>
        }
        actions={[]}
      />
    </React.Fragment>
  );
};
