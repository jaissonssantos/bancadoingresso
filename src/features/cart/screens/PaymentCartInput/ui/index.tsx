import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Button } from 'src/components/Button';
import { AmountInput } from 'src/components/AmountInput';
import { Header } from 'src/components/Header';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import { toString } from 'src/util/currency';
import type { UseFormReturn } from 'src/hooks/useForm';
import { styles } from './styles';

export type PaymentCartInputFormData = {
  amount: string;
};

interface PaymentCartInputUIProps
  extends Pick<
    UseFormReturn<PaymentCartInputFormData>,
    'formErrors' | 'formData'
  > {
  fee: number;
  onBack: () => void;
  onChangeAmount: (amount: string) => void;
  onPaymentTypeChoice: () => void;
  submitDisabled: boolean;
}

export const PaymentCartInputUI: React.FC<PaymentCartInputUIProps> = ({
  fee,
  formData,
  formErrors,
  submitDisabled,
  onBack,
  onChangeAmount,
  onPaymentTypeChoice,
}) => {
  return (
    <React.Fragment>
      <Header onBack={onBack} title="Valor" />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.contentTitle}>
          <Text
            size={TextSizes.medium}
            weight={TextWeights.bold}
            style={styles.title}>
            Informe o valor a ser pago
          </Text>
        </View>

        <KeyboardAwareScrollView style={styles.container}>
          <AmountInput
            name="amount"
            placeholder="0,00"
            value={formData.amount}
            error={formErrors.amount?.[0]}
            maxLength={14}
            returnKeyType="done"
            keyboardType="numeric"
            onChangeText={onChangeAmount}
          />
        </KeyboardAwareScrollView>

        <View
          style={[styles.row, styles.spacingContainer, styles.spacingBottom]}>
          <Text
            size={TextSizes.small}
            weight={TextWeights.regular}
            align={TextAligns.center}
            style={styles.spacingTop}>
            Valor total do pedido:
          </Text>
          <Text
            size={TextSizes.small}
            weight={TextWeights.medium}
            align={TextAligns.center}
            style={styles.spacingTop}>
            {toString(fee)}
          </Text>
        </View>

        <View style={styles.containerButton}>
          <Button
            title="Forma de pagamento"
            disabled={submitDisabled}
            onPress={(): void =>
              !submitDisabled ? onPaymentTypeChoice() : undefined
            }
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
