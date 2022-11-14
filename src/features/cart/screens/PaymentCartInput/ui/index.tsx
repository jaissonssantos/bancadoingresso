import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import { Button } from 'src/components/Button';
import { AmountInput } from 'src/components/AmountInput';
import { KeyboardAwareScrollView } from 'src/components/KeyboardAwareScrollView';
import type { ICartState } from 'src/redux/cartSlice';
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
  cart: ICartState;
  onChangeAmount: (amount: string) => void;
  onPaymentTypeChoice: () => void;
  submitDisabled: boolean;
}

export const PaymentCartInputUI: React.FC<PaymentCartInputUIProps> = ({
  cart,
  formData,
  formErrors,
  submitDisabled,
  onChangeAmount,
  onPaymentTypeChoice,
}) => {
  return (
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

      <View style={[styles.row, styles.spacingContainer, styles.spacingBottom]}>
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
          {toString(cart.totalAmount)}
        </Text>
      </View>

      <View style={styles.containerButton}>
        <Button
          title="Forma de pagamento"
          disabled={submitDisabled}
          onPress={onPaymentTypeChoice}
        />
      </View>
    </SafeAreaView>
  );
};
