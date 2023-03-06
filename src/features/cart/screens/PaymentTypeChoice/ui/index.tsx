import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressableOpacity } from 'src/components/PressableOpacity';
import { Text, TextAligns, TextSizes, TextWeights } from 'src/components/Text';
import {
  MoneyIcon,
  PixIcon,
  DebitCardIcon,
  CreditCardIcon,
  IconSizes,
} from 'src/assets/icons';
import { Colors } from 'src/styleguide/colors';
import type { ICartState } from 'src/redux/cartSlice';
import { toString } from 'src/util/currency';
import { styles } from './styles';

interface PaymentTypeChoiceUIProps {
  cart: ICartState;
  amount: number;
  cashFee: number;
  debitCardFee: number;
  pixFee: number;
  onMoneyPress: () => void;
  onPixPress: () => void;
  onDebitCardPress: () => void;
  onCreditCardPress: () => void;
}

export const PaymentTypeChoiceUI: React.FC<PaymentTypeChoiceUIProps> = ({
  cart,
  amount,
  cashFee,
  debitCardFee,
  pixFee,
  onMoneyPress,
  onPixPress,
  onDebitCardPress,
  onCreditCardPress,
}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.contentTitle}>
        <Text
          size={TextSizes.medium}
          weight={TextWeights.bold}
          style={styles.title}>
          Escolha a forma de pagamento
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <PressableOpacity onPress={onMoneyPress} style={styles.paymentMethod}>
          <MoneyIcon size={IconSizes.small} fill={Colors.white} />
          <Text
            size={TextSizes.small}
            weight={TextWeights.light}
            align={TextAligns.center}
            style={styles.spacingTop}>
            Dinheiro
          </Text>
          <Text
            size={TextSizes.small}
            weight={TextWeights.bold}
            align={TextAligns.center}
            style={[styles.bold, styles.spacingTopSmall]}>
            {toString(amount)}
          </Text>
        </PressableOpacity>

        <PressableOpacity onPress={onPixPress} style={styles.paymentMethod}>
          <PixIcon size={IconSizes.small} fill={Colors.white} />
          <Text
            size={TextSizes.small}
            weight={TextWeights.light}
            align={TextAligns.center}
            style={styles.spacingTop}>
            Pix
          </Text>
          {pixFee - amount > 0 && (
            <Text
              size={TextSizes.xxsmall}
              weight={TextWeights.light}
              align={TextAligns.center}
              style={styles.spacingTopSmall}>
              {toString(amount)} + {toString(pixFee - amount)} (taxa)
            </Text>
          )}
          <Text
            size={TextSizes.small}
            weight={TextWeights.bold}
            align={TextAligns.center}
            style={[styles.bold, styles.spacingTopSmall]}>
            {toString(pixFee)}
          </Text>
        </PressableOpacity>

        <PressableOpacity
          onPress={onDebitCardPress}
          style={styles.paymentMethod}>
          <DebitCardIcon size={IconSizes.small} fill={Colors.white} />
          <Text
            size={TextSizes.small}
            weight={TextWeights.light}
            align={TextAligns.center}
            style={styles.spacingTop}>
            Débito
          </Text>
          <Text
            size={TextSizes.xxsmall}
            weight={TextWeights.light}
            align={TextAligns.center}
            style={styles.spacingTopSmall}>
            {toString(amount)} + {toString(debitCardFee - amount)} (taxa)
          </Text>
          <Text
            size={TextSizes.small}
            weight={TextWeights.bold}
            align={TextAligns.center}
            style={[styles.bold, styles.spacingTopSmall]}>
            {toString(debitCardFee)}
          </Text>
        </PressableOpacity>

        <PressableOpacity
          onPress={onCreditCardPress}
          style={styles.paymentMethod}>
          <CreditCardIcon size={IconSizes.small} fill={Colors.white} />
          <Text
            size={TextSizes.small}
            weight={TextWeights.light}
            align={TextAligns.center}
            style={styles.spacingTop}>
            Crédito
          </Text>
        </PressableOpacity>
      </ScrollView>

      <View style={[styles.row, styles.spacingContainer]}>
        <Text
          size={TextSizes.small}
          weight={TextWeights.regular}
          align={TextAligns.center}
          style={styles.spacingTop}>
          Restando pagar:
        </Text>
        <Text
          size={TextSizes.small}
          weight={TextWeights.medium}
          align={TextAligns.center}
          style={styles.spacingTop}>
          {toString(cart.totalAmount - amount)}
        </Text>
      </View>

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
    </SafeAreaView>
  );
};
