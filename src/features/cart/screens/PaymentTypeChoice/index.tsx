import React from 'react';
import { useSelector } from 'react-redux';
import { useFees } from 'src/redux/feesSlice';
import { useCart } from 'src/redux/cartSlice';
import type { CartStackScreenProps } from 'src/navigation/CartStack';
import { ROUTES } from 'src/navigation/constants/routes';
import { calculateFees } from 'src/util/helpers';
import { feeToNumber } from 'src/util/formatters';
import { PaymentTypeChoiceUI } from './ui';

type PaymentTypeChoiceScreenProps =
  CartStackScreenProps<'CartTabHome.PaymentTypeChoice'>;

export const PaymentTypeChoiceScreen: React.FC<
  PaymentTypeChoiceScreenProps
> = ({ navigation, route }) => {
  const cart = useSelector(useCart);
  const { maximumFee } = useSelector(useFees);

  console.log('maximumFee >>>', maximumFee);
  const amountFromNavigation = route.params.amount ?? 0;

  const amount =
    amountFromNavigation < cart.totalAmount
      ? amountFromNavigation
      : cart.totalAmount;

  const amountFee = calculateFees(
    cart.totalAmount,
    feeToNumber(maximumFee?.administrateTax),
  );

  const debitCardPercentageFee =
    feeToNumber(maximumFee?.fee) + feeToNumber(maximumFee?.debit);
  const pixPercentageFee =
    feeToNumber(maximumFee?.fee) + feeToNumber(maximumFee?.pix);

  const debitCardFee = calculateFees(amount, debitCardPercentageFee);
  const pixFee = calculateFees(amount, pixPercentageFee);

  const handleOnMoneyPress = (): void =>
    navigation.navigate(ROUTES.CartTabHome.PaymentByCash, {
      amount,
    });

  const handleOnPixPress = (): void =>
    navigation.navigate(ROUTES.CartTabHome.PaymentByPix);

  const handleOnDebitCardPress = (): void =>
    navigation.navigate(ROUTES.Payments.PaymentByDebitCard, {
      amount: amountFee,
    });

  const handleOnCreditCardPress = (): void =>
    navigation.navigate(ROUTES.Payments.PaymentChoiceByInstallment, {
      amount: amountFee,
    });

  return (
    <PaymentTypeChoiceUI
      cart={cart}
      amount={amountFee / 100}
      cashFee={amountFee / 100}
      debitCardFee={debitCardFee / 100}
      pixFee={pixFee / 100}
      onMoneyPress={handleOnMoneyPress}
      onPixPress={handleOnPixPress}
      onDebitCardPress={handleOnDebitCardPress}
      onCreditCardPress={handleOnCreditCardPress}
    />
  );
};
